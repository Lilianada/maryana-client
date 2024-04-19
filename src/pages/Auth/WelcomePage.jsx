import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
    return (
      <div className="bg-white sm:bg-custom-pattern bg-cover bg-center h-screen grid place-items-center">
        <div className="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-50 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Hello Lilian Ubaba,
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Welcome to CVS Online Portfolio Management, we are delighted to have you onboard. Kindly complete your KYC to get started.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/kyc-form"
                className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Complete KYC
              </Link>
              <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-800">
                Explore your account <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  