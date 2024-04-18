import React, { useEffect, useState } from "react";
import {
  investmentWindow,
  plannedInvestments,
  primaryPurpose,
  stockExperiences,
  stockInvestents,
} from "../../../config/data";
import { getUserKyc, updateUserKyc } from "../../../config/user";
import { customModal } from "../../../utils/modalUtils";
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useModal } from "../../../context/ModalContext";
import { useSelector } from "react-redux";

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
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalSets = plannedInvestments.length;
  const isLastSet = currentSetIndex === totalSets - 1;

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

  const handleSave = async () => {
    // Save the current set answers (you would implement the logic to save it to backend or local state)
    console.log("Saving current answers:", formData);
  };

  const handleNext = () => {
    handleSave();
    if (!isLastSet) {
      setCurrentSetIndex(currentSetIndex + 1);
      setProgress(((currentSetIndex + 1) / totalSets) * 100);
    }
  };

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="py-5 text-left">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Know Your Customer Form
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used in personalizing your experience.
        </p>
        <div
          style={{
            width: `${progress}%`,
            height: "20px",
            backgroundColor: "blue",
          }}
        ></div>{" "}
        {/* Progress Bar */}
      </div>

      <div className="space-y-10 divide-y divide-gray-900/10 mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Your goal
            </h2>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="purpsoe-trading"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Primary purpose of trading with us
                  </label>
                  <div className="mt-2">
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your primary purpose</option>
                      {primaryPurpose.map((purpose, index) => (
                        <option value={purpose} key={index}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="planned-investments"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Planned investments
                  </label>
                  <div className="mt-2">
                    <select
                      name="investments"
                      value={formData.investments}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your planned investments</option>
                      {plannedInvestments.map((investment, index) => (
                        <option value={investment} key={index}>
                          {investment}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="investment-window"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Investment window
                  </label>
                  <div className="mt-2">
                    <select
                      name="investWindow"
                      value={formData.investWindow}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your investment window</option>
                      {investmentWindow.map((investment, index) => (
                        <option value={investment} key={index}>
                          {investment}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
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
                Save & Next
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-10 divide-y divide-gray-900/10 mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Stocks Investing Experience
            </h2>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="purpsoe-trading"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Over the last year, how many times have you invested in
                    stocks and/or ETFs?
                  </label>
                  <div className="mt-2">
                    {stockExperiences.map((investment, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="stockExperience"
                            value={investment}
                            checked={formData.stockExperience === investment}
                            onChange={handleChange}
                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {investment}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="planned-investments"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    In the last year, how much have you invested in stocks
                    and/or ETFs?
                  </label>
                  <div className="mt-2">
                    {stockInvestents.map((investment, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="stocksInvestment"
                            value={investment}
                            checked={
                              formData.stocksInvestment.includes(investment) ||
                              false
                            }
                            onChange={handleChange}
                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {investment}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="investment-window"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Investment window
                  </label>
                  <div className="mt-2">
                    <select
                      name="investWindow"
                      value={formData.investWindow}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your investment window</option>
                      {investmentWindow.map((investment, index) => (
                        <option value={investment} key={index}>
                          {investment}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
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
                Save & Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
