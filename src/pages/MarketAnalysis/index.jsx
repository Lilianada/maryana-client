/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import TickerWidget from "./Widgets/Ticker";
import SearchBar from "./Widgets/SearchBar";
import MiniChartWidget from "./Widgets/MiniChartWidget";
import ChartWidget from "./Widgets/ChartWidget";
import StockHeatmapWidget from "./Widgets/StockHeatmapWidget";
import MarketMovers from "./Widgets/MarketMovers";
import TechnicalAnalysisWidget from "./Widgets/TechnicalAnalysis";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      hours: "52.0",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: "12.0",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      hours: "4.0",
      rate: "$100.00",
      price: "$400.00",
    },
  ],
};
const activity = [
  {
    id: 1,
    type: "created",
    person: { name: "Chelsea Hagon" },
    date: "7d ago",
    dateTime: "2023-01-23T10:32",
  },
  {
    id: 2,
    type: "edited",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:03",
  },
  {
    id: 3,
    type: "sent",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:24",
  },
  {
    id: 4,
    type: "commented",
    person: {
      name: "Chelsea Hagon",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 5,
    type: "viewed",
    person: { name: "Alex Curren" },
    date: "2d ago",
    dateTime: "2023-01-24T09:12",
  },
  {
    id: 6,
    type: "paid",
    person: { name: "Alex Curren" },
    date: "1d ago",
    dateTime: "2023-01-24T09:20",
  },
];
const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIconMini,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MarketAnalysis() {
  const [selected, setSelected] = useState(moods[5]);
  const [selectedSymbol, setSelectedSymbol] = useState("NASDAQ:AAPL");
  const [isTechnicalAnalysisLoading, setIsTechnicalAnalysisLoading] =
    useState(false);
  const [isChartWidgetLoading, setIsChartWidgetLoading] = useState(false);
  const [isSymbolInfoLoading, setIsSymbolInfoLoading] = useState(false);

  const handleSearch = (query) => {
    setSelectedSymbol(`NASDAQ:${query.toUpperCase()}`);
  };

  return (
    <>
      <main>
        <header className="relative isolate">
          <TickerWidget />
        </header>

        <div className="mx-auto mt-4 ba">
          <div className="mx-auto grid grid-cols-1 grid-rows-1 items-start gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Invoice summary */}

            {/* Invoice */}
            <div className="grid gap-6 bg-white -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:pb-20 xl:pt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                <SearchBar onSearch={handleSearch} />
                <MiniChartWidget symbol={selectedSymbol} />
              </div>

              <ChartWidget
                symbol={selectedSymbol}
                setIsChartWidgetLoading={setIsChartWidgetLoading}
              />
              <StockHeatmapWidget />
            </div>

            <div className="lg:col-start-3 grid gap-6">
              <div className="bg-white">
                <MarketMovers />
              </div>
              <div className="bg-white">
                <TechnicalAnalysisWidget
                  symbol={selectedSymbol}
                  setIsTechnicalAnalysisLoading={setIsTechnicalAnalysisLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
