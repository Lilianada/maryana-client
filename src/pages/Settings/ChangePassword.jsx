import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import React, { Fragment, useEffect, useState } from "react";
import { fetchPasswordPolicySetting } from "../../config/utils";
import { Popover, Transition } from "@headlessui/react";
import {
  EyeIcon,
  EyeSlashIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import DotLoader from "../../components/DotLoader";

const strongPolicyRequirements = [
  { name: "Minimum of 6 characters" },
  { name: "One uppercase letter" },
  { name: "One lowercase letter" },
  { name: "At least one number" },
  { name: "At least one special character (!@#$%^&*)" },
];

const requirements = [
  { name: "No spaces allowed" },
  { name: "Minimum of 6 characters" },
];

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requiresReauth, setRequiresReauth] = useState(false);
  const [isStrongPasswordPolicy, setIsStrongPasswordPolicy] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const validatePassword = (pass, isStrongPolicy) => {
    if (isStrongPolicy) {
      const regex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(pass);
    } else {
      return pass.length >= 6;
    }
  };

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return false;
    }
    if (!validatePassword(newPassword, isStrongPasswordPolicy)) {
      setError(
        isStrongPasswordPolicy
          ? "Password must be at least 8 characters long, must contain at least one number and a special character."
          : "Password must be at least 6 digits long."
      );
      return false;
    }
    return true;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!validatePasswords()) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        return updatePassword(user, newPassword);
      })
      .then(() => {
        setSuccessMessage("Password updated successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setError(
          "Failed to update password. Please make sure your current password is correct."
        );
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Fetch the password policy setting from Firestore.
    fetchPasswordPolicySetting()
      .then((isStrong) => {
        setIsStrongPasswordPolicy(isStrong);
      })
      .catch((error) => {
        console.error("Error fetching password policy:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Change Password
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Confirm your password and make sure it is something you can remember.
        </p>
      </div>

      <form
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        onSubmit={handleChangePassword}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current password
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  name="current_password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                  {showPassword ? (
                    <EyeIcon
                      className="h-5 w-5 text-indigo-400"
                      aria-hidden="true"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                  {showNewPassword ? (
                    <EyeIcon
                      className="h-5 w-5 text-indigo-400"
                      aria-hidden="true"
                      onClick={toggleNewPasswordVisibility}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                      onClick={toggleNewPasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? (
              <div className="flex w-full justify-center align-middle gap-2">
                <span>Saving</span>
                <DotLoader />
              </div>
            ) : (
              "Update Password "
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
