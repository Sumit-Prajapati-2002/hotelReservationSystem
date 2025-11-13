import { Users, Calendar } from "lucide-react";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Total Users" value="1,245" icon={Users} color="amber" />
      <Card title="Active Bookings" value="342" icon={Calendar} color="orange" />
    </div>
  );
}

function Card({ title, value, icon: Icon, color }) {
  const colors = {
    amber: "bg-amber-100 text-amber-600",
    orange: "bg-orange-100 text-orange-500",
  };
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-start transition-transform hover:scale-105">
      <div className={`${colors[color]} p-3 rounded-xl mb-4`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}
