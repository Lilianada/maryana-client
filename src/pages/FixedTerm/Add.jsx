import React, { Fragment, useState } from "react";
import { formatNumber, getCurrentDate } from "../../config/utils";
import { depositFixedTerm, withdrawFixedTerm } from "../../config/terms";
import { customModal } from "../../utils/modalUtils";
import {
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import DotLoader from "../../components/DotLoader";
import { Dialog, Transition } from "@headlessui/react";
import CurrencyInput from "react-currency-input-field";
import { useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";

export default function TermsModal({ setOpen, open, fixedTerm }) {
  const user = useSelector((state) => state.user);
  const { showModal, hideModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [type, setType] = useState("");

  const handleConfirm = async (newDeposit) => {
    setIsLoading(true);
    try {
      await withdrawFixedTerm(user.userId, newDeposit);
      customModal({
        showModal,
        title: "Success",
        text: "Your request has been sent successfully.",
        showConfirmButton: false,
        icon: CheckIcon,
        iconBgColor: "bg-green-100",
        iconTextColor: "text-green-600",
        buttonBgColor: "bg-green-600",
        timer: 2000,
      });
      setOpen(false);
    } catch (error) {
      customModal({
        showModal,
        title: "Error!",
        text: "There was an error. Please try again.",
        showConfirmButton: false,
        icon: ExclamationTriangleIcon,
        iconBgColor: "bg-red-100",
        iconTextColor: "text-red-600",
        buttonBgColor: "bg-red-600",
        timer: 2000,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeposit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (!fixedTerm) {
        console.error("No selected fixed term deposit.");
        return;
      }
      const newDeposit = {
        date: getCurrentDate(),
        principalAmount: parseFloat(depositAmount),
        minAmount: fixedTerm.minAmount,
        status: "Paid",
        bankName: fixedTerm.bankName,
        term: fixedTerm.term,
        interestRate: fixedTerm.interestRate,
        type: type,
        image: fixedTerm.image,
        userId: user.userId,
        userName: user.name,
      };

      if (type === "deposit") {
        await depositFixedTerm(user.userId, newDeposit);
        customModal({
          showModal,
          title: "Success!",
          text: `You have successfully made a deposit rewquest of $${formatNumber(
            depositAmount
          )}.`,
          showConfirmButton: false,
          icon: CheckIcon,
          iconBgColor: "bg-green-100",
          iconTextColor: "text-green-600",
          buttonBgColor: "bg-green-600",
          timer: 2000,
        });
      } else {
        customModal({
          showModal,
          title: "Early Withdrawal Alert!",
          text: `You are initiating an early withdrawal from your term deposit, which may incur the following:`,
          list: true,
          listItems: [
            "An early withdrawal penalty (refer to terms and conditions for details).",
            "A flat administration fee of $30.",
          ],
          showConfirmButton: true,
          confirmButtonText: "Yes, withdraw",
          cancelButtonText: "Cancel",
          confirmButtonBgColor: "bg-green-600",
          confirmButtonTextColor: "text-white",
          cancelButtonBgColor: "bg-white",
          cancelButtonTextColor: "text-gray-900",
          onConfirm: () => {
            handleConfirm(newDeposit);
            hideModal();
          },
          onCancel: hideModal(),
          onClose: hideModal(),
          icon: ExclamationTriangleIcon,
          iconBgColor: "bg-orange-100",
          iconTextColor: "text-orange-600",
          timer: 0,
        });
      }
      setDepositAmount(0);
      setOpen(false);
    } catch (error) {
      console.error("Error adding deposit transaction: ", error);
      customModal({
        showModal,
        title: "Error!",
        text: `There was an error encountered. Please tryy again.`,
        showConfirmButton: false,
        icon: ExclamationCircleIcon,
        iconBgColor: "bg-red-100",
        iconTextColor: "text-red-600",
        buttonBgColor: "bg-red-600",
        timer: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setOpen(false)}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                <button
                  type="button"
                  className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <form
                  className="text-left px-4 pt-10 pb-4"
                  onSubmit={onDeposit}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-6">
                    <div className="">
                      <h2 className="text-xl font-semibold leading-7 text-gray-900">
                        Deposit/Withdraw Fixed Term Deposit
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Deposit amount can not be less than minimum investment amount and withdrawal cannot be more than amount owned. Early withdrawal incurs a flat rate fee.
                      </p>
                    </div>

                    <div className="pb-4">
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                          <label
                            htmlFor="bankName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Bank Name
                          </label>
                          <div className="text-sm leading-6 text-gray-500 font-normal">
                            {fixedTerm.bankName}
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="term"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Length
                          </label>
                          <div className="text-sm leading-6 text-gray-500 font-normal">
                            {fixedTerm.term}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="currentValue"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Minimum Amount
                          </label>
                          <div className="text-sm leading-6 text-gray-500 font-normal">
                            ${formatNumber(fixedTerm.minAmount)} 
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="fixedTermAmount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Input Amount
                          </label>
                          <div className="mt-2">
                            <CurrencyInput
                              decimalSeparator="."
                              prefix="$"
                              name="fixedTermAmount"
                              placeholder="$0"
                              defaultValue={depositAmount}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              decimalsLimit={2}
                              onValueChange={(value) => {
                                const formattedValue =
                                  parseFloat(value).toFixed(2);
                                setDepositAmount(parseFloat(formattedValue));
                              }}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            IPOs Type
                          </label>
                          <div className="mt-2">
                            <select
                              name="type"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value="">Select Type </option>
                              <option value="deposit">Deposit</option>
                              <option value="withdrawal">Withdrawal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-6 justify-end">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      {isLoading ? (
                        <div className="flex w-full justify-center align-middle gap-2">
                          <span>Submitting</span>
                          <DotLoader />
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
