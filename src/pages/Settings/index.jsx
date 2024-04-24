import { useState } from "react";
import {
  DocumentTextIcon,
  BuildingLibraryIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import BondCards from "../Bonds";
import TermTable from "../Accounts/TermsTable";
// import

const nav = [
  { name: "Profile", href: "profile", icon: UserCircleIcon, current: true },
  { name: "Password", href: "password", icon: LockClosedIcon, current: false },
  {
    name: "Document",
    href: "document",
    icon: DocumentTextIcon,
    current: false,
  },
  {
    name: "Bank Details",
    href: "bankDetails",
    icon: BuildingLibraryIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>

        <aside className="flex sm:justify-center overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-40 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4">
            <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {nav.map((item) => (
                <li
                key={item.name}
                onClick={() => handleTabClick(item.href)}
                className={classNames(
                  item.href === activeTab
                    ? "bg-gray-50 text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                  "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold cursor-pointer"
                )}
                aria-current={item.href === activeTab ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    item.href === activeTab
                      ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 bg-white sm:-ml-6 sm:-mr-6 sm:-mb-6 lg:pr-6 lg:pl-6 lg:pb-6">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            {activeTab === "profile" && <BondCards />}
            {activeTab === "password" && <TermTable/>}
            {activeTab === "document" && <BondCards />}
            {activeTab === "bankDetails" && <BondCards />}
          </div>
        </main>
      </div>
    </>
  );
}
