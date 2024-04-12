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
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "./firebase";
  import { getAuth, signOut } from "firebase/auth";
  import { useNavigate } from "react-router-dom";
  
  // const USER_COLLECTION = "users";
  const USERS_COLLECTION = "users";
  const ADMIN_DASH_COLLECTION = "admin_users";
  const USERS_REQUESTS = "userRequests";
  const ADMINUSERS_COLLECTION = "adminUsers";
  