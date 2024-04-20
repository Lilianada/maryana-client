import React from 'react';

// Mock transactions data for display purposes
const transactions = [
    { id: 'T1001', company: 'Company A', share: 'Tech', commission: '+$4.370', price: '$2,000.00', quantity: '50', netAmount: '$10000' },
    { id: 'T1002', company: 'Company B', share: 'Finance', commission: '+$24.315', price: '$1,050.00', quantity: '30', netAmount: '$4500' },
    { id: 'T1003', company: 'Company C', share: 'Health', commission: '+$14.370', price: '$3,000.00', quantity: '20', netAmount: '$6000' },
];

export default function Table() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-12 max-w-p">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A table of placeholder stock market data that does not make any sense.
                    </p>
                </div>
            </div>
            <div className="mt-8 overflow-hidden">
                <div className="align-middle inline-block min-w-full">
                    <div className="overflow-x-auto border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[' ID', 'Company', 'Share', 'Commission', 'Price', 'Quantity', 'Net $'].map((header, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-slate-50">
                                {transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        {Object.values(transaction).map((value, idx) => (
                                            <td key={idx} className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {value}
                                            </td>
                                        ))}
                                        <td className="px-3 py-4 text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
