import React from 'react'

export default function ThirdSection({
    formData,
    handleChange,
    cryptoExperiences,
    cryptoInvestments,
}) {
  return (
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
                        className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
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
                        className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
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
        {/* <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Save
          </button>
          <button
            type="submit"
            className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Save & Next
          </button>
        </div> */}
      </form>
    </div>
  </div>
  )
}
