import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useSelector } from "react-redux";
import { getBondsHoldings } from "../../config/bonds";
import DotLoader from "../../components/DotLoader";
import { formatNumber } from "../../config/utils";

export default function BondTable() {
  const userId = useSelector((state) => state.user.userId);
  const { showModal, hideModal } = useModal();
  const [bonds, setBonds] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBonds();
  }, []);

  const fetchBonds = async () => {
    setIsLoading(true);
    try {
      const result = await getBondsHoldings(userId);
      setBonds(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = (item) => {
    setSelectedId(item.id);
    showModal("buyBond");
  };

  const handleSell = (id) => {
    setSelectedId(id);
    showModal("sellBond");
  };

  return (
    <div className="-mx-4 mt-8 sm:-mx-0">
        <div className="sm:flex-auto text-left mb-8">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
            A list of all the bonds you have purchased
            </h1>
          </div>
      {bonds === null || bonds.length === 0 ? (
        <div className="w-full grid place-items-center rounded-xl border border-gray-200 p-4 mt-12">
          <h5 className="text-gray-400 text-base ">
            NO BONDS TRANSACTIONS AVAILABLE.
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
                Issuer Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Type
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Date Issued
              </th>
              <th
                scope="col"
                className="hidden backdrop:px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Maturity Date
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-slate-50 text-left">
            {bonds.map((item, index) => (
              <tr key={index}>
                <td className="w-2/5 max-w-12 truncate py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 capitalize w-">
                  {item.issuerName}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only lg:hidden">Maturity Date</dt>
                    <dd className="mt-1 truncate text-gray-500 lg:hidden">
                      {item.maturityDate}
                    </dd>
                  </dl>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 ">
                  ${formatNumber(item.currentValue)}
                </td>
                <td className=" px-3 py-4 text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className=" px-3 py-4 text-sm text-gray-500 uppercase">
                  {item.typeOfRequest}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell capitalize">
                  {item.purchaseDate || item.saleDate || item.date}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500  lg:table-cell  capitalize">
                  {item.maturityDate}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    onClick={() => handleBuy(item)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Buy
                    <span className="sr-only">, {item.issuerName}</span>
                  </button>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    onClick={() => handleSell(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sell
                    <span className="sr-only">, {item.issuerName}</span>
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
