import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useSelector } from "react-redux";
import DotLoader from "../../components/DotLoader";
import { formatNumber } from "../../config/utils";
import { getUserTerm } from "../../config/terms";

export default function TermTable() {
  const userId = useSelector((state) => state.user.userId);
  const { showModal, hideModal } = useModal();
  const [terms, setTerms] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    setIsLoading(true);
    try {
      const result = await getUserTerm(userId);
      setTerms(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = (item) => {
    setSelectedId(item.id);
    showModal("buyTerm");
  };

  const handleSell = (id) => {
    setSelectedId(id);
    showModal("sellTerm");
  };

  return (
    <div className="-mx-4 mt-8 sm:-mx-0">
      <div className="sm:flex-auto text-left mb-8">
      <p className="mt-2 text-sm text-gray-700">
          A list of all the terms you have purchased
        </p>
      </div>
      {terms === null || terms.length === 0 ? (
        <div className="w-full grid place-items-center rounded-xl border border-gray-200 p-4 mt-12">
          <h5 className="text-gray-400 text-base ">
            NO FIXED TERMS TRANSACTIONS AVAILABLE.
          </h5>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Bank Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Term
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Principal $
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Type
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Interest Rate
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Purchase Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200 text-left">
            {terms.map((term, index) => (
              <tr key={index}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none capitalize sm:pl-0">
                  {term.bankName}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only lg:hidden">Type</dt>
                    <dd className="mt-1 text-gray-700 capitalize">
                      {term.type}
                    </dd>
                    <dt className="sr-only">Interest Rate</dt>
                    <dd className="mt-1 text-gray-700 sm:hidden">
                      {term.interestRate}%
                    </dd>
                    <dt className="sr-only sm:hidden">Purchase Date</dt>
                    <dd className="mt-1 truncate text-gray-700">{term.date}</dd>
                  </dl>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">{term.term}</td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  ${formatNumber(term.principalAmount)}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 capitalize lg:table-cell">
                  {term.type}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {term.interestRate}%
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {term.date}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleBuy(term)}
                  >
                    Buy
                  </button>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleSell(term.id)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && <DotLoader />}
    </div>
  );
}
