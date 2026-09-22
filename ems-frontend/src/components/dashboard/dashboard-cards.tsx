import { PlusSquare, User, MessageSquare, CheckCircle } from "lucide-react";

const stats = [
  {
    key: 1,
    name: "Tickets created",
    value: "1",
    icon: <PlusSquare className="w-5 h-5 text-gray-700" />,
  },
  {
    key: 2,
    name: "Tickets resolved",
    value: "8",
    icon: <CheckCircle className="w-5 h-5 text-gray-700" />,
  },
  {
    key: 3,
    name: "Active users",
    value: "42",
    icon: <User className="w-5 h-5 text-gray-700" />,
  },
  {
    key: 4,
    name: "Messages sent",
    value: "135",
    icon: <MessageSquare className="w-5 h-5 text-gray-700" />,
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-5 mt-[-50px]">
      {stats.map((item) => (
        <div
          key={item.key}
          className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-md"
        >
          <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-center">
            {item.icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm">{item.name}</p>
            <p className="text-lg font-semibold text-gray-900">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
