import React from "react";

export default function SixthSection({
  formData,
  handleChange,
  financialStatus,
  occupation,
  netAnnualIncome,
  currencies,
  liquidNetWorth,
  totalNetWorth,
}) {
  
  return (
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
                  htmlFor="select-currency"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Please select one of the following currencies for the below options.
                </label>
                <div className="mt-2">
                  <select
                    name="selectCurrency"
                    value={formData.selectCurrency}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  >
                    <option value="">Select your currency</option>
                    {currencies.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="financialStats"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your sources of income Your answer is considered as the source
                  of funds for your investments
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="netIncome"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your net annual income.
                </label>
                <div className="mt-2">
                  <select
                    name="netIncome"
                    value={formData.netIncome}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
                  htmlFor="liquidNetWorth"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your liquid net worth.
                </label>
                <div className="mt-2">
                  <select
                    name="liquidNetWorth"
                    value={formData.liquidNetWorth}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  >
                    <option value="">Select your liquid net worth</option>
                    {liquidNetWorth.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="totalNet"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your total net worth.
                </label>
                <div className="mt-2">
                  <select
                    name="totalNet"
                    value={formData.totalNetWorth}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  >
                    <option value="">
                      Select your total net worth
                    </option>
                    {totalNetWorth.map((item, index) => (
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
                  Your total cash and liquid assets. Such as savings
                  accounts, brokerage accounts etc.
                </label>
                <div className="mt-2">
                  <select
                    name="assets"
                    value={formData.assets}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
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
        </form>
      </div>
    </div>
  );
}
