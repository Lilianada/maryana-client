/*
* @license
* Copyright 2022 Google LLC
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const ADMINDASH_COLLECTION = "admin_users";
const USERS_COLLECTION = "users";

//Delete user from auth table
export async function deleteUserByPhone(phoneNumber) {
  console.log("Deleting user by phone number:", phoneNumber);
  const functionsInstance = getFunctions();
  const deleteFunction = httpsCallable(functionsInstance, "deleteUserByPhone");

  try {
    const result = await deleteFunction({ phoneNumber });
    console.log(result.data.message);
    return result.data;
  } catch (error) {
    console.error("Error calling deleteUserByPhone function:", error);
    throw error;
  }
}

//register user
export const registerNewUser = async (db, auth, requestData) => {

  try {
    // Step 0: Delete the first instance created of the user from Firebase Authentication
   const result = await deleteUserByPhone(requestData.mobilePhone);

   if (result.success === true) {
    // Step 1: Create the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      requestData.email,
      requestData.password
    );
    // 
    
    const user = userCredential.user;
    // Send email verification
    await sendEmailVerification(user);

    // Step 2: Use the User ID as the document ID in the 'users' collection
    const newUserId = userCredential.user.uid;
    await setDoc(doc(db, "users", newUserId), {
      fullName: requestData.fullName,
      email: requestData.email,
      address: requestData.address,
      mobilePhone: requestData.mobilePhone,
      country: requestData.country,
      jointAccount: requestData.jointAccount,
      secondaryAccountHolder: requestData.secondaryAccountHolder,
      uid: newUserId,
      userId: newUserId,
      createdAt: requestData.createdAt,
    });

    // Step 3: Send a confirmation email
    const mailRef = collection(db, "mail");
    await addDoc(mailRef, {
      to: requestData.email,
      message: {
        subject: "Signup Request Approved",
        html: `<p>Hello ${requestData.fullName},</p>
            <p>Your signup request has been approved! You can now log in using your credentials.</p>
            <p>Thank you for joining us!</p>`,
      },
    });
  }

    return "User request approved successfully.";
  } catch (error) {
    console.error("Error approving user:", error);
    // Rollback in case of failure after creating the user
    await deleteUserByPhone(requestData.mobilePhone);
    throw new Error(`Error approving user: ${error.message}`);
  }
};

// Authenticated user
export function getAuthUser() {
  const authInstance = getAuth();
  const user = authInstance.currentUser;

  if (!user) {
    return;
  }
  const authUser = user.uid;
  return authUser;
}

export async function getUserName() {
  const userId = getAuthUser();
  const userDocRef = doc(db, "users", userId);
  let userName = "Unknown User";

  try {
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userDetails = userDocSnapshot.data();
      userName = userDetails.fullName;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
  return userName;
}

export async function getUser(uid) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return [{ ...userSnap.data(), id: userSnap.id }];
  } else {
    return [];
  }
}

export function updateUser(uid, userData) {
  const userDoc = doc(db, USERS_COLLECTION, uid);
  return updateDoc(userDoc, userData);
}

export function deleteUser(uid) {
  const userDoc = doc(db, USERS_COLLECTION, uid);
  return deleteDoc(userDoc);
}


//fetch user kyc
const KYC_DOC_ID = "kycDoc";
export async function getUserKyc(userId) {
  const kycRef = collection(db, USERS_COLLECTION, userId, KYC_DOC_ID);
  const kycSnapshot = await getDocs(kycRef);

  const kycData = kycSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  // If there's no kyc at all, return null
  if (kycData.length === 0) {
    return null;
  }
  return kycData ? kycData[0] : null;
}

// Update or create user KYC document
export async function updateUserKyc(userId, kycData) {
  try {
    const kycCollectionRef = collection(
      db,
      USERS_COLLECTION,
      userId,
      KYC_DOC_ID
    );
    const kycDocRef = doc(kycCollectionRef, "kyc_document");
    await setDoc(kycDocRef, kycData, { merge: true });
    return { success: true, id: KYC_DOC_ID };
  } catch (error) {
    console.error("Error updating kyc:", error);
    return { success: false, error: error.message }; // Return error message on failure
  }
}

export async function getUserKycCompletion(userId) {
  const kycDocRef = doc(db, USERS_COLLECTION, userId, KYC_DOC_ID, 'kyc_document');
  const kycSnapshot = await getDoc(kycDocRef);

  if (!kycSnapshot.exists()) {
    return 0; // No KYC data found
  }

  const kycData = kycSnapshot.data();
  const keys = Object.keys(kycData);
  const totalFields = keys.length; // Dynamically count fields
  let filledFields = 0;

  keys.forEach((key) => {
    const value = kycData[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        filledFields += value.length > 0 ? 1 : 0;
      } else if (typeof value === 'string') {
        filledFields += value.trim() !== "" && value.toLowerCase() !== "nil" ? 1 : 0;
      } else {
        filledFields += 1; // Consider non-string and non-array types as filled if they are not null
      }
    }
  });

  const completionPercentage = Math.round((filledFields / totalFields) * 100);
  return completionPercentage;
}
