import React, { useEffect, useState } from 'react'
import { getUserIpos } from '../../config/ipos';
import { useModal } from '../../context/ModalContext';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../config/utils';

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
    }
  
  return (
    <div className="-mx-4 mt-8 sm:-mx-0">
        <div className="sm:flex-auto text-left mb-8">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
            A list of all the IPOs you have purchased
            </h1>
          </div>
        {ipos === null ? (
          <div className="w-full grid place-items-center rounded-xl border border-gray-200 p-4 mt-12">
            <h5 className="text-gray-400 text-base ">
              NO IPOS TRANSACTIONS AVAILABLE.
            </h5>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Company Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Shares
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Share Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="hidden backdrop:px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Purchase Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-gray-50 text-left">
              {ipos.map((item, index) => (
                <tr key={index}>
                  <td className="w-2/5 max-w-12 truncate py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 capitalize">
                    {item.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only lg:hidden">Type</dt>
                      <dd className="mt-1 truncate text-gray-700 sm:hidden">
                        {item.type}
                      </dd>
                      <dd className="mt-1 truncate text-gray-500 lg:hidden">
                        ${formatNumber(item.sharePrice)}
                      </dd>
                      <dt className="sr-only lg:hidden">Purchase Date</dt>
                      <dd className="mt-1 truncate text-gray-700 lg:hidden">
                        {item.date}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell capitalize">
                    {item.type}
                  </td>
                  <td className=" px-3 py-4 text-sm text-gray-500">
                    {item.numberOfShares}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    ${formatNumber(item.sharePrice)}
                  </td>
                  <td className=" px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    ${formatNumber(item.numberOfShares * item.sharePrice)}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
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
  )
}
