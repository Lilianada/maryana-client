import { sendEmailVerification } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../../config/firebase';
import backgroundImageUrl from '../../assets/Background.jpg';
import { getDownloadURL, ref } from 'firebase/storage';
import { fetchLogo } from '../../config/utils';
import DotLoader from '../../components/DotLoader';

export default function VerifyEmail() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [logoUrl, setLogo] = useState("");


  useEffect(() => {
    const fetchLogo = async () => {
        await fetchLogo(setLogo);
    }
    fetchLogo();
  }, []);

  
    const handleEmailVerification = async () => {
      setIsLoading(true);
  
      try {
        // Send the email verification link
        await sendEmailVerification(auth.currentUser);
  
        setMessage('Verification email sent. Please check your inbox.');
        setTimeout(() => {
          setMessage('');
        }, 2000);
        setIsLoading(false);
      } catch (error) {
        setError('Error sending verification email. Please try again.');
        setTimeout(() => {
          setError('');
        }, 2000);
        setIsLoading(false);
        console.error(error);
      }
    };
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
                  src={logoUrl}
                  alt="Company Logo"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Verify Email Address
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                Please click the button below to send a verification email to your address.
                </p>
              </div>
    
              <form
                className="space-y-4 text-left mt-10"
                action="#"
                method="POST"
                onSubmit={handleEmailVerification}
              >
    
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
            </div>
          </div>
        </div>
      );
}
