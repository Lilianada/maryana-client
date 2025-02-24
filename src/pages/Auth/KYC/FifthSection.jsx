import { RadioGroup } from "@headlessui/react";
import React from "react";

export default function FifthSection({
  formData,
  handleChange,
  setFormData,
  tradingExperience,
  educationExperience,
  tradingKnowledgeAssessment,
  tradingStrategy,
  purposeOfTrading,
  investmentAmount,
  riskReward,
  familyMembers,
  investExperience,
  investKnowledge,
  riskProfile,
  relevantInvestment
}) {
  return (
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
                  htmlFor="investment-experience"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Are you accustomed to making your own financial decisions?
                </label>
                <div className="mt-2">
                  <select
                    name="investExperience"
                    value={formData.investExperience}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  >
                    <option value="">Select your investment experience</option>
                    {investExperience.map((investment, index) => (
                      <option value={investment} key={index}>
                        {investment}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="col-span-full">
                <label
                  htmlFor="investment-knowledge"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Please pick any of the following that matches your knowledge.
                </label>
                <div className="mt-2">
                  <select
                    name="investKnowledge"
                    value={formData.investKnowledge}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  >
                    <option value="">Select your investment knowledge</option>
                    {investKnowledge.map((investment, index) => (
                      <option value={investment} key={index}>
                        {investment}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              

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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
                  htmlFor="relevantInvestment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Please tick any of  the following investments you consider yourself to be familiar with from your previous investment experience.
                </label>
                <div className="mt-2">
                  {relevantInvestment.map((item, index) => (
                    <div key={index}>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="relevantInvestment"
                          value={item}
                          checked={formData.relevantInvestment.includes(item)}
                          onChange={handleChange}
                          className="form-checkbox h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
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
                  htmlFor="educationExperience"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  What's your investment education experience regarding
                  leveraged products?(CDs, Futures, Options, Forex, Margin trade
                  and ETF). Please select one or more relevant answers.
                </label>
                <div className="mt-2">
                  {educationExperience.map((experience, index) => (
                    <div key={index}>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="eduExperience"
                          value={experience}
                          checked={formData.eduExperience.includes(experience)}
                          onChange={handleChange}
                          className="form-checkbox h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
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
                          checked={formData.tradeKnowledge.includes(investment)}
                          onChange={handleChange}
                          className="form-checkbox h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
                  htmlFor="riskProfile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Please select one of the following which matches your circumstances.
                </label>
                <div className="mt-2">
                  <select
                    name="riskProfile"
                    value={formData.riskProfile}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  >
                    <option value="">
                      Select your risk profile
                    </option>
                    {riskProfile.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
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
                                  ? "bg-teal-50 border-teal-200 z-10"
                                  : "border-gray-200"
                              }`}
                            >
                              <span
                                className={`h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center ${
                                  checked
                                    ? "bg-teal-600 border-transparent"
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
                  Does any of the following apply to you? <br /> I or any of my
                  immediate family members are:
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
                          className="form-checkbox h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
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
        </form>
      </div>
    </div>
  );
}
