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
    <div className="bg-gray-50 h-[calc(100vh_-_120px)]">
      <div className="py-5 text-left">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Know Your Customer Form
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be used in personalizing your experience.
        </p>
        {/* <nav aria-label="Progress">
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
        </nav> */}
      </div>

      <div className="space-y-10 divide-y divide-gray-900/10 mt-6">
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
                    htmlFor="purpose-trading"
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

      {/* Stock investing experience */}
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

      {/* Crypto investing experience */}
      <div className="space-y-10 divide-y divide-gray-900/10 mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Crypto Investing Experience
            </h2>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="cryptoExperience"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Over the last year, how many times have you invested in
                    crypto?
                  </label>
                  <div className="mt-2">
                    {cryptoExperiences.map((investment, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="cryptoExperience"
                            value={investment}
                            checked={formData.cryptoExperience.includes(
                              investment
                            )}
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
                    htmlFor="cryptoInvestment"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    How much did you invest?
                  </label>
                  <div className="mt-2">
                    {cryptoInvestments.map((investment, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="cryptoInvestment"
                            value={investment}
                            checked={
                              formData.cryptoInvestment.includes(investment) ||
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

      {/* Leverage investing experience */}
      <div className="space-y-10 divide-y divide-gray-900/10 mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Leverage Investing Experience
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              The following questions relate to your leveraged investment
              experience (CFDS, futures, options, forex, margin trading, etc.)
              over the last year.
            </p>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="leverageExperience"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    How many of these types of investments have you made?
                  </label>
                  <div className="mt-2">
                    {["1-10", "10-40", "40 plus"].map((investment, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="leverageExperience"
                            value={investment}
                            checked={formData.leverageExperience.includes(
                              investment
                            )}
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
                    htmlFor="leverageInvestments"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    In the last year, how much have you invested in ?
                  </label>
                  <div className="mt-2">
                    {["$1-$500", "$500-$2000", "$2000 plus"].map(
                      (investment, index) => (
                        <div key={index}>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="leverageInvestments"
                              value={investment}
                              checked={formData.leverageInvestments.includes(
                                investment
                              )}
                              onChange={handleChange}
                              className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {investment}
                            </span>
                          </label>
                        </div>
                      )
                    )}
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

      {/* Trading Knowledge and Experience */}
      <div className="space-y-10 divide-y divide-gray-900/10 mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Your Trading Knowldge and Experience
            </h2>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="tradeExperience"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Trading Experience
                  </label>
                  <div className="mt-2">
                    <select
                      name="tradeExperience"
                      value={formData.tradeExperience}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your trading experience</option>
                      {tradingExperience.map((experience, index) => (
                        <option value={experience} key={index}>
                          {experience}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="educationExperience"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    What's your investment education experience regarding
                    leveraged products?(CDs, Futures, Options, Forex, Margin
                    trade and ETF). Please select one or more relevant answers.
                  </label>
                  <div className="mt-2">
                    {educationExperience.map((experience, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="eduExperience"
                            value={experience}
                            checked={formData.eduExperience.includes(
                              experience
                            )}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {experience}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="tradeKnowledge"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    We would like to assess your level of knowledge of complex
                    derivatives and trading with leverage
                  </label>
                  <div className="mt-2">
                    {tradingKnowledgeAssessment.map((investment, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="tradeKnowledge"
                            value={investment}
                            checked={formData.tradeKnowledge.includes(
                              investment
                            )}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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
                    htmlFor="tradeStrategy"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    How long do you plan to leave your positions open?
                  </label>
                  <div className="mt-2">
                    <select
                      name="tradeStrategy"
                      value={formData.tradeStrategy}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your trading strategy</option>
                      {tradingStrategy.map((strategy, index) => (
                        <option value={strategy} key={index}>
                          {strategy}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="purposeTrading"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    What best describes your primary purpose of trading with us?
                  </label>
                  <div className="mt-2">
                    <select
                      name="purposeTrading"
                      value={formData.purposeTrading}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your purpose of trading</option>
                      {purposeOfTrading.map((purpose, index) => (
                        <option value={purpose} key={index}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="investmentAmount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    How much are you willing to invest?
                  </label>
                  <div className="mt-2">
                    <select
                      name="investAmount"
                      value={formData.investAmount}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">
                        Select how much you are willing to invest
                      </option>
                      {investmentAmount.map((attitude, index) => (
                        <option value={attitude} key={index}>
                          {attitude}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="riskReward"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Which risk/reward scenario best describes your annual
                    investments expectations with us?
                  </label>
                  <div className="mt-2">
                    <RadioGroup
                      value={formData.risk.name}
                      onChange={(selectedName) => {
                        const selectedRisk = riskReward.find(
                          (risk) => risk.name === selectedName
                        );
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          risk: selectedRisk || { name: "", limit: "" },
                        }));
                      }}
                    >
                      <div className="space-y-4">
                        {riskReward.map((option, index) => (
                          <RadioGroup.Option key={index} value={option.name}>
                            {({ checked }) => (
                              <div
                                className={`relative border p-4 flex cursor-pointer focus:outline-none rounded-lg ${
                                  checked
                                    ? "bg-indigo-50 border-indigo-200 z-10"
                                    : "border-gray-200"
                                }`}
                              >
                                <span
                                  className={`h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center ${
                                    checked
                                      ? "bg-indigo-600 border-transparent"
                                      : "bg-white border-gray-300"
                                  }`}
                                  aria-hidden="true"
                                >
                                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                                </span>
                                <div className="ml-3 flex flex-col lg:flex-row gap-4 w-full">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {option.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="block text-sm text-gray-500"
                                  >
                                    {option.limit}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="familyMembers"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Does any of the following apply to you? <br /> I or any of
                    my immediate family members are:
                  </label>
                  <div className="mt-2">
                    {familyMembers.map((item, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="familyAssessment"
                            value={item}
                            checked={formData.familyAssessment.includes(item)}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {item}
                          </span>
                        </label>
                      </div>
                    ))}
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

      {/* Financial Status */}
      <div className="space-y-10 divide-y divide-gray-900/10 mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Your Finacial Status
            </h2>
          </div>

          <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="financialStats"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your sources of income Your answer is considered as the
                    source of funds for your investments
                  </label>
                  <div className="mt-2">
                    {financialStatus.map((item, index) => (
                      <div key={index}>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="financialStats"
                            value={item}
                            checked={formData.financialStats.includes(item)}
                            onChange={handleChange}
                            className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {item}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="occupation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your sources of income, your answer is considered as the
                    source of funds for your investments
                  </label>
                  <div className="mt-2">
                    <select
                      name="job"
                      value={formData.job}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your occupation</option>
                      {occupation.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="employerDets"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Employer name, address and your position
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="employerDets"
                      value={formData.employerDets}
                      onChange={handleChange}
                      placeholder="Company Name, Address, Position"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="netIncome"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your net annual income (USD)
                  </label>
                  <div className="mt-2">
                    <select
                      name="netIncome"
                      value={formData.netIncome}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select your net annual income</option>
                      {netAnnualIncome.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="assets"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your total cash and liquid assets (USD). Such as savings
                    accounts, brokerage accounts etc.
                  </label>
                  <div className="mt-2">
                    <select
                      name="assets"
                      value={formData.assets}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">
                        Select your total cash and liquid assets
                      </option>
                      {netAnnualIncome.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
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
                Submit all
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
