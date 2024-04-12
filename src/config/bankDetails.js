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
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Banking Details
export async function addBankingDetails(uid, data) {
  const bankingDetailsRef = collection(db, "users", uid, "bankingDetails");
  return addDoc(bankingDetailsRef, data);
}

export async function updateBankingDetails(uid, docId, data) {
  return setDoc(doc(db, "users", uid, "bankingDetails", docId), data);
}

export async function getBankingDetails(uid) {
  const firestorePath = `users/${uid}/bankingDetails`;

  const bankingDetailsQuery = query(collection(db, firestorePath));
  const querySnapshot = await getDocs(bankingDetailsQuery);

  if (querySnapshot.empty) {
    return []; // Return an empty array if no banking details are found
  }

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
}
