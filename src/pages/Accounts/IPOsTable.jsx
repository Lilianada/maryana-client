import React, { useEffect, useState } from "react";
import { getUserIpos } from "../../config/ipos";
import { useModal } from "../../context/ModalContext";
import { useSelector } from "react-redux";
import { formatNumber } from "../../config/utils";

export default function IPOsTable() {
  const userId = useSelector((state) => state.user.userId);
  const { showModal, hideModal } = useModal();
  const [ipos, setIpos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetchIpos();
  }, []);

  const fetchIpos = async () => {
    try {
      const result = await getUserIpos(userId);
      setIpos(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvest = (item) => {
    setSelectedId(item.id);
    showModal("buyIpo");
  };

  const handleSell = (id) => {
    setSelectedId(id);
    showModal("sellIpo");
  };

  return (
    <div className="px-4 mt-12 max-w-[96vw] sm:max-w-[92vw] lg:max-w-[100vw]">
      <div className="sm:flex-auto text-left mb-8">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          A list of all the IPOs you have purchased
        </h1>
      </div>
      <div className="mt-8 overflow-scroll">
        <div className="align-middle inline-block min-w-full">
          <div className="border-t border-gray-200">
            {ipos === null ? (
              <div className="w-full grid place-items-center rounded-xl border border-gray-200 p-4 mt-12">
                <h5 className="text-gray-400 text-base ">
                  NO IPOS TRANSACTIONS AVAILABLE.
                </h5>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    {[
                      "Company Name",
                      "Type",
                      "Shares",
                      "Shares Price",
                      "Total",
                      "Date",
                    ].map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {header}
                      </th>
                    ))}
                     <th scope="col" className="relative px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <span className="sr-only">Invest</span>
                    </th>
                    <th scope="col" className="relative px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <span className="sr-only">Sell</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-slate-50">
                  {ipos.map((item, index) => (
                    <tr key={index}>
                      <td className=" truncate max-w-12 px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {item.name}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        {item.numberOfShares}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        ${formatNumber(item.sharePrice)}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        ${formatNumber(item.numberOfShares * item.sharePrice)}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleInvest(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Invest<span className="sr-only">, {item.name}</span>
                        </button>
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleSell(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Sell
                          <span className="sr-only">, {item.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
