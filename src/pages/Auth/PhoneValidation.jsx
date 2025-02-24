import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

export default function PhoneVerification({
  isOpen,
  onClose,
  onVerify,
  onResend,
  isLoading,
  error,
  successMessage,
  canResend,
  counter,
  setCounter,
  setCanResend,
  code,
  setCode,
}) {

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  if (!isOpen) {
    return null;
  }


  const onChange = (element, index) => {
    if (isNaN(element.value)) return false;
    let newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);
    if (element.nextSibling) element.nextSibling.focus();
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-teal-500 hover:text-teal-700"
          >
            <XMarkIcon className="h-5 w-5 stroke-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <h1 className="text-xl font-semibold text-teal-600 mb-2 text-center">
            Verify Code
          </h1>
          <p className="text-gray-600 mb-4 text-center">
            Please enter the verification code sent to your phone.
          </p>
          <form onSubmit={onVerify} className="w-full grid place-items-center">
            <div className="flex mb-4">
              {code.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-10 h-10 text-center border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  value={value}
                  onChange={(e) => onChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-teal-600 text-white font-semibold rounded-md transition duration-300 hover:bg-teal-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div>
              ) : (
                "Verify"
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            {canResend ? (
              <button
                onClick={onResend}
                className="text-teal-600 hover:text-teal-700"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-gray-600">Resend Code in {counter} seconds</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
