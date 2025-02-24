import React, { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatNumber } from "../config/utils";
import CustomModal from "./CustomModal";
import {
  ArrowLeftStartOnRectangleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import { auth } from "../config/firebase";
import LoadingScreen from "./LoadingScreen";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, navigation }) {
  const location = useLocation();
  const balance = useSelector((state) => state.user.balance);
  const userName = useSelector((state) => state.user.name);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSignOut = () => {
    setIsLoading(true);
    auth
      .signOut()
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error signing out:", error);
      });
  };

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: item.to === location.pathname,
  }));

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar */}
              {isLoading && (<LoadingScreen/>)}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center mt-4">
                  <img className="h-12 w-auto" src={Logo} alt="Maryana Capital Inc." />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col -mx-2 space-y-1">
                    <li className="mb-6">
                      <div className="group flex items-center w-full bg-white text-gray-900 rounded-md px-2 py-2 text-sm font-medium">
                        <div className="flex flex-col justify-start ">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            {userName}
                          </p>
                          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                            Total Account Value:
                            <span className="text-teal-500">
                              {" "}
                              ${formatNumber(balance)}
                            </span>
                          </p>
                          <p className="text-xs italic font-medium text-gray-500 group-hover:text-gray-700"></p>
                        </div>
                      </div>
                    </li>

                    {updatedNavigation.map((item) => (
                      <li key={item.name} onClick={() => setSidebarOpen(false)}>
                        <Link
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "border-teal-600 bg-teal-50 text-teal-600"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-teal-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-3 h-6 w-6 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="absolute bottom-1 flex flex-1 flex-col -mx-2 space-y-1 w-11/12"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <button
                      onClick={onSignOut}
                      className="group flex gap-x-3 tems-center px-3 py-2 text-sm font-medium leading-6 hover:border-rose-600 hover:border-l-4 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <ArrowLeftStartOnRectangleIcon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      Sign out
                      <span className="sr-only">Sign out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
            {/* <CustomModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              title="Sign out"
              description="Are you sure you want to sign out of your account?"
              showConfirmButton={true}
              confirmButtonText="Sign Out"
              cancelButtonText="Cancel"
              confirmButtonBgColor="bg-red-600"
              confirmButtonTextColor="text-white"
              onConfirm={() => {
                setIsLoading(true);
                auth
                  .signOut()
                  .then(() => {
                    setIsLoading(false);
                    navigate("/");
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    console.error("Error signing out:", error);
                  });
              }}
              onCancel={() => setIsOpen(false)}
              Icon={ExclamationTriangleIcon}
              iconBgColor="bg-red-100"
              buttonBgColor="bg-red-600"
              iconTextColor="text-red-600"
              loading={isLoading}
            /> */}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
