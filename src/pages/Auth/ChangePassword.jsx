import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../config/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import DotLoader from "../../components/DotLoader";
import { customModal } from "../../utils/modalUtils";
import { CheckIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useModal } from "../../context/ModalContext";
import backgroundImageUrl from "../../assets/Background.jpg";
import { useAlert } from "../../context/AlertContext";
import { customAlert } from "../../utils/alertUtils";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { fetchPasswordPolicySetting } from "../../config/utils";

export default function ChangePassword() {
  const { showAlert, hideAlert } = useAlert();
  const { showModal } = useModal();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isStrongPasswordPolicy, setIsStrongPasswordPolicy] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [logo, setLogo] = useState("");
  const [whiteLogo, setWhiteLogo] = useState("");

  const fetchLogo = async () => {
    const storageRef = ref(
      storage,
      "gs://cvs-online.appspot.com/logos/darkLogo/"
    );
    try {
      const logoUrl = await getDownloadURL(storageRef);
      setLogo(logoUrl);
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


  const validatePassword = (pass, isStrongPolicy) => {
    if (isStrongPolicy) {
      const regex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(pass);
    } else {
      return pass.length >= 6;
    }
  };

  const fetchWhiteLogo = async () => {
    const storageRef = ref(
      storage,
      "gs://cvs-online.appspot.com/logos/darkLogo/"
    );
    try {
      const logoUrl = await getDownloadURL(storageRef);
      setWhiteLogo(logoUrl);
    } catch (error) {
      console.error("Error fetching whiteLogo:", error);
    }
  };

  useEffect(() => {
    fetchWhiteLogo();
  }, []);

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      customAlert({
        showAlert,
        title: "New password and confirm password do not match.",
        description: error.message,
        textColor: "text-red-800",
        icon: XCircleIcon,
        iconBgColor: "bg-red-100",
        iconTextColor: "text-red-600",
        list: false,
        onClose: hideAlert,
        timer: 3000,
      });
      return false;
    }
    if (!validatePassword(newPassword, isStrongPasswordPolicy)) {
      isStrongPasswordPolicy
        ? customAlert({
            showAlert,
            title:
              "Password must be at least 8 characters long, must contain at least one number and a special character.",
            description: error.message,
            textColor: "text-red-800",
            icon: XCircleIcon,
            iconBgColor: "bg-red-100",
            iconTextColor: "text-red-600",
            list: false,
            onClose: hideAlert,
            timer: 3000,
          })
        : customAlert({
            showAlert,
            title: "Password must be at least 6 digits long.",
            description: error.message,
            textColor: "text-red-800",
            icon: XCircleIcon,
            iconBgColor: "bg-red-100",
            iconTextColor: "text-red-600",
            list: false,
            onClose: hideAlert,
            timer: 3000,
          });
      return false;
    }
    return true;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePasswords()) {
      setIsLoading(false);
      return;
    }

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      customModal({
        showModal,
        title: "Success",
        text: "Password updated successfully.",
        showConfirmButton: false,
        iconBgColor: "bg-green-100",
        iconTextColor: "text-green-600",
        buttonBgColor: "bg-green-600",
        icon: CheckIcon,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      customModal({
        showModal,
        title: "Error",
        text: error.message || "Error updating password. Please try again.",
        showConfirmButton: false,
        iconBgColor: "bg-red-100",
        iconTextColor: "text-red-600",
        buttonBgColor: "bg-red-600",
        icon: XCircleIcon,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
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
    <div
      className="grid min-h-full h-screen flex-1 place-items-center justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-blue-50 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Company Logo"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Change Password
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Please enter your current password and new password.
            </p>
          </div>

          <form
            className="space-y-4 text-left mt-10"
            action="#"
            method="POST"
            onSubmit={handleChangePassword}
          >
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                className="bg-white focus:bg-blue-50 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type={showPassword ? "text" : "password"}
                name="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="password"
                placeholder="Current Password"
              />
              <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <EyeIcon
                    className="h-4 w-4 text-indigo-300"
                    aria-hidden="true"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <EyeSlashIcon
                    className="h-4 w-4 text-gray-300"
                    aria-hidden="true"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>

              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  className="bg-white focus:bg-blue-50 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={({ target: { value } }) =>
                    setNewPassword(value)
                  }
                  autoComplete="new-password"
                  placeholder="New Password"
                />
                <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                  {showNewPassword ? (
                    <EyeIcon
                      className="h-4 w-4 text-indigo-300"
                      aria-hidden="true"
                      onClick={toggleNewPassword}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-4 w-4 text-gray-300"
                      aria-hidden="true"
                      onClick={toggleNewPassword}
                    />
                  )}
                </div>
              </div>

              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  className="bg-white focus:bg-blue-50 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={({ target: { value } }) =>
                    setConfirmPassword(value)
                  }
                  autoComplete="confirm-password"
                    placeholder="Confirm Password"
                />
                <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                  {showConfirmPassword ? (
                    <EyeIcon
                      className="h-4 w-4 text-indigo-300"
                      aria-hidden="true"
                      onClick={toggleConfirmPassword}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="h-4 w-4 text-gray-300"
                      aria-hidden="true"
                      onClick={toggleConfirmPassword}
                    />
                  )}
                </div>
              </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (
                  <div className="flex w-full justify-center align-middle gap-2">
                    <span>Submitting</span>
                    <DotLoader />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Remembered your password?{" "}
            <Link
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
