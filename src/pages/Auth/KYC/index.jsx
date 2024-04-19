import React, { useEffect, useState } from "react";
import {
  cryptoExperiences,
  cryptoInvestments,
  educationExperience,
  familyMembers,
  financialStatus,
  investmentAmount,
  investmentWindow,
  netAnnualIncome,
  occupation,
  plannedInvestments,
  primaryPurpose,
  purposeOfTrading,
  riskReward,
  stockExperiences,
  stockInvestents,
  tradingExperience,
  tradingKnowledgeAssessment,
  tradingStrategy,
} from "../../../config/data";
import { getUserKyc, updateUserKyc } from "../../../config/user";
import { customModal } from "../../../utils/modalUtils";
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useModal } from "../../../context/ModalContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";

const steps = [
  { name: "Step 1", to: "#", status: "complete" },
  { name: "Step 2", to: "#", status: "complete" },
  { name: "Step 3", to: "#", status: "current" },
  { name: "Step 4", to: "#", status: "upcoming" },
  { name: "Step 5", to: "#", status: "upcoming" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function KycForm() {
  const { showModal, hideModal } = useModal();
  const [formData, setFormData] = useState({
    eduExperience: "",
    purpose: "",
    tradeExperience: "",
    investments: "",
    investWindow: "",
    tradingKnowledge: "",
    tradeKnowledge: "",
    purposeTrading: "",
    financialStats: [],
    stocksInvestment: "",
    stockExperience: "",
    cryptoExperience: "",
    cryptoInvestment: "",
    leverageExperience: "",
    leverageInvestments: "",
    job: "",
    employerDets: "",
    netIncome: "",
    assets: "",
    investAmount: "",
    risk: {
      name: "",
      limit: "",
    },
    familyAssessment: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchKycDetails = async () => {
      try {
        const details = await getUserKyc(userId);
        if (details) {
          setFormData((prevDetails) => ({
            ...prevDetails,
            eduExperience: details.eduExperience || [],
            purpose: details.purpose || "",
            tradeExperience: details.tradeExperience || "",
            investments: details.investments || "",
            investWindow: details.investWindow || "",
            tradeKnowledge: details.tradeKnowledge || [],
            tradeStrategy: details.tradeStrategy || "",
            purposeTrading: details.purposeTrading || "",
            financialStats: details.financialStats || [],
            job: details.job || "",
            employerDets: details.employerDets || "",
            stocksInvestment: details.stocksInvestment || "",
            stockExperience: details.stockExperience || "",
            cryptoExperience: details.cryptoExperience || "",
            cryptoInvestment: details.cryptoInvestment || "",
            leverageExperience: details.leverageExperience || "",
            leverageInvestments: details.leverageInvestments || "",
            netIncome: details.netIncome || "",
            assets: details.assets || "",
            investAmount: details.investAmount || "",
            risk: details.risk || { name: "", limit: "" },
            familyAssessment: details.familyAssessment || [],
          }));
        } else {
          setFormData({
            eduExperience: [],
            purpose: "",
            tradeExperience: "",
            investments: "",
            investWindow: "",
            tradeKnowledge: [],
            tradeStrategy: "",
            purposeTrading: "",
            financialStats: [],
            stocksInvestment: "",
            stockExperience: "",
            cryptoExperience: "",
            cryptoInvestment: "",
            leverageExperience: "",
            leverageInvestments: "",
            job: "",
            employerDets: "",
            netIncome: "",
            assets: "",
            investAmount: "",
            risk: {
              name: "",
              limit: "",
            },
            familyAssessment: [],
          });
        }
      } catch (err) {
        console.error("Error fetching KYC details:", err);
      }
    };

    if (userId) {
      fetchKycDetails();
    }
  }, []);

  // Handle field changes for both single and multiple value fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Example submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await updateUserKyc(userId, formData); // Await the response from the updateUserKyc function

    if (response.success) {
      // Show a success message if KYC details were successfully updated
      customModal({
        showModal,
        title: "Success!",
        text: "KYC details updated successfully.",
        showConfirmButton: false,
        icon: CheckIcon,
        iconBgColor: "bg-green-100",
        iconTextColor: "text-green-600",
        buttonBgColor: "bg-green-600",
        timer: 2000,
        onClose: hideModal,
      });
    } else {
      // Handle the error case
      console.error("Error updating KYC details:", response.error);
      customModal({
        showModal,
        title: "Error!",
        text: `There was a problem updating KYC details: ${response.error}`,
        showConfirmButton: false,
        icon: ExclamationTriangleIcon,
        iconBgColor: "bg-red-100",
        iconTextColor: "text-red-600",
        buttonBgColor: "bg-red-600",
        onClose: hideModal,
        timer: 3000,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-50 h-[calc(100vh_-_120px)]">
      <div className="py-5 text-left">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Know Your Customer Form
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used in personalizing your experience.
        </p>
        {/* Progress bar */}
        <nav aria-label="Progress">
          <ol className="flex items-center mt-4">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={classNames(
                  stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                  "relative"
                )}
              >
                {step.status === "complete" ? (
                  <>
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="h-0.5 w-full bg-indigo-600" />
                    </div>
                    <Link
                      to="#"
                      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900"
                    >
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{step.name}</span>
                    </Link>
                  </>
                ) : step.status === "current" ? (
                  <>
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <Link
                      to="#"
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                      aria-current="step"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-indigo-600"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{step.name}</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <Link
                      to="#"
                      className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{step.name}</span>
                    </Link>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Form sections */}

      

      {/* Stock investing experience */}
      

      {/* Crypto investing experience */}
      

      {/* Leverage investing experience */}
      

      {/* Trading Knowledge and Experience */}
     
      {/* Financial Status */}
      
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Save
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit all
        </button>
      </div>
    </div>
  );
}
