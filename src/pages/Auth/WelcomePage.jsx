import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserKycCompletion } from "../../config/user";

export default function WelcomePage() {
  const [kycCompletion, setKycCompletion] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const userId = user.userId;
    getUserKycCompletion(userId).then(setKycCompletion);
  }, []);

  return (
    <div className="bg-gray-800 sm:bg-custom-pattern bg-cover bg-center h-screen grid place-items-center">
      <div className="mx-auto max-w-7xl py-4 px-2 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-50 px-6 py-12 text-center shadow-2xl rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Hello {user.name},
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-4 sm:leading-7 text-gray-600">
            Welcome to CVS Online Portfolio Management.{" "}
            {kycCompletion !== null &&
              kycCompletion < 100 &&
              `You have completed only ${kycCompletion}% of your KYC, you have ${
                100 - kycCompletion
              }% more to go.`}
          </p>

          <div className="flex mt-8 items-center justify-center gap-x-6 ">
          {kycCompletion !== null && kycCompletion < 100 ? (
              <Link
                to="/kyc-form"
                className="cursor-pointer rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Complete KYC
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore your account
              </Link>
            )}
            <Link
              to="/dashboard"
              className="hidden min-[430px]:flex text-sm font-semibold leading-6 text-gray-800"
            >
              Explore your account <span aria-hidden="true">→</span>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
