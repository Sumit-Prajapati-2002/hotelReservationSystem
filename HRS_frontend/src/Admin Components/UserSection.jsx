import { CheckCircle } from "lucide-react";

export default function UsersSection() {
  const users = ["User 1", "User 2", "User 3", "User 4"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {users.map((user, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
        >
          <div>
            <h3 className="font-bold text-gray-900">{user}</h3>
            <p className="text-gray-500">{user.toLowerCase().replace(" ", "")}@example.com</p>
          </div>
          <CheckCircle className="text-green-500" />
        </div>
      ))}
    </div>
  );
}
