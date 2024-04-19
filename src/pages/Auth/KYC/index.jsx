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
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import FifthSection from "./FifthSection";
import SixthSection from "./SixthSection";

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
  const { showModal, hideModal } = useModal();
  const userId = useSelector((state) => state.user.userId);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 6;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;

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
  const handleInputChange = (event) => {
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

  const handleSave = async () => {
    // This function could be adapted to save data to the backend or localstorage
    console.log("Saving current data:", formData);
  };

  const handleNext = () => {
    handleSave();
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <FirstSection
            formData={formData}
            handleChange={handleInputChange}
            primaryPurpose={primaryPurpose}
            plannedInvestments={plannedInvestments}
            investmentWindow={investmentWindow}
          />
        );
      case 1:
        return (
          <SecondSection
            formData={formData}
            handleChange={handleInputChange}
            stockExperiences={stockExperiences}
            stockInvestents={stockInvestents}
          />
        );
      case 2:
        return (
          <ThirdSection
            formData={formData}
            handleChange={handleInputChange}
            cryptoExperiences={cryptoExperiences}
            cryptoInvestments={cryptoInvestments}
          />
        );
      case 3:
        return (
          <FourthSection formData={formData} handleChange={handleInputChange} />
        );
      case 4:
        return (
          <FifthSection
            formData={formData}
            handleChange={handleInputChange}
            setFormData={setFormData}
            tradingExperience={tradingExperience}
            educationExperience={educationExperience}
            tradingKnowledgeAssessment={tradingKnowledgeAssessment}
            tradingStrategy={tradingStrategy}
            purposeOfTrading={purposeOfTrading}
            investmentAmount={investmentAmount}
            riskReward={riskReward}
            familyMembers={familyMembers}
          />
        );
      case 5:
        return (
          <SixthSection
            formData={formData}
            handleChange={handleInputChange}
            financialStatus={financialStatus}
            occupation={occupation}
            netAnnualIncome={netAnnualIncome}
          />
        );
      default:
        return <div>Section not found.</div>;
    }
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
        <p>
          Section {currentSection + 1} of {totalSections}
        </p>
        <div className="mt-6" aria-hidden="true">
          <div className="overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
            {Array.from({ length: totalSections }, (_, i) => (
              <div
                key={i}
                className={`text-center ${
                  i <= currentSection ? "text-indigo-600" : ""
                }`}
              >
                {`Step ${i + 1}`}
              </div>
            ))}
          </div>
        </div>
        {renderSection()}
      </div>

      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        {currentSection < totalSections - 1 ? (
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleNext}
          >
            Save & Next
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit all
          </button>
        )}
      </div>
    </div>
  );
}
