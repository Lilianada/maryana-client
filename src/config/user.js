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
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";

// const USER_COLLECTION = "users";
const USERS_COLLECTION = "users";

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
