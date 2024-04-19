import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const accounts = [
  { name: 'Cash Balance', icons: 'GA', href: '#', amount: '16, 00', bgColor: 'bg-pink-600' },
  { name: 'Bonds Account', icons: 'CD', href: '#', amount: '12, 900', bgColor: 'bg-purple-600' },
  { name: 'Term Deposit', icons: 'T', href: '#', amount: '16, 980', bgColor: 'bg-yellow-500' },
  { name: 'IPOs Balance', icons: 'RC', href: '#', amount: '8, 900', bgColor: 'bg-green-500' },
  { name: 'Shares Account', icons: 'RC', href: '#', amount: '8, 900', bgColor: 'bg-green-500' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Overview() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800">Account Overview</h2>
      <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {accounts.map((item) => (
          <li key={item.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                item.bgColor,
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
              {item.icons}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex flex-col gap-4 flex-1 truncate px-4 py-4 text-base">
                <Link to={item.href} className="font-medium text-gray-900 hover:text-gray-600">
                  {item.name}
                </Link>
                <p className="text-gray-500">$ {item.amount}</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
