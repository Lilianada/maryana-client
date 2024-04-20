import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { BanknotesIcon, CreditCardIcon, DocumentChartBarIcon, CalendarIcon, ArrowTrendingUpIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const accounts = [
  { name: 'Cash Balance', icons: BanknotesIcon, href: '#', amount: '16, 000.00', bgColor: 'bg-pink-600' },
  { name: 'Bonds Account', icons: DocumentChartBarIcon, href: '#', amount: '12, 900.00', bgColor: 'bg-purple-600' },
  { name: 'Term Deposit', icons: CreditCardIcon, href: '#', amount: '16, 980.00', bgColor: 'bg-yellow-500' },
  { name: 'IPOs Balance', icons: CalendarIcon, href: '#', amount: '8, 900.00', bgColor: 'bg-green-500' },
  { name: 'Shares Account', icons: ArrowTrendingUpIcon, href: '#', amount: '18, 900.00', bgColor: 'bg-indigo-500' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Overview() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800">Account Overview</h2>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {accounts.map((item) => (
          <li key={item.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                item.bgColor,
                'flex w-20 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
              <item.icons className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex flex-col gap-2 flex-1 truncate px-4 py-3 text-sm">
                <Link to={item.href} className="font-medium text-gray-900 hover:text-gray-600">
                  {item.name}
                </Link>
                <p className="text-gray-500">$ {item.amount}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
