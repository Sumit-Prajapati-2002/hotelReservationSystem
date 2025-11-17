import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">No booking data found!</p>
      </div>
    );
  }

  const {
    booking,
    customer,
    rooms,
    checkIn_date,
    checkOut_date,
    num_guest,
    totalPrice,
  } = state;

  const handleDownload = () => {
    const content = `
        Booking Confirmation

        Customer: ${customer?.firstname} ${customer?.lastname}
        Email: ${customer?.email}
        Phone: ${customer?.phone_no}
        Guests: ${num_guest}
        Check-in: ${checkIn_date}
        Check-out: ${checkOut_date}
        Rooms: ${rooms.join(", ")}

        Booking ID: ${booking?.booking_id || "N/A"}
        Status: Confirmed
        Total Price: RS${totalPrice || booking?.total_price || 0}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `booking_${booking?.booking_id || "details"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-500 p-4 rounded-full">
            <Check size={32} className="text-white" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-green-600 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for your reservation. Here are your booking details:
        </p>

        <div className="bg-gray-100 p-6 rounded-xl mb-6 text-left">
          <p>
            <strong>Customer:</strong> {customer?.firstname}{" "}
            {customer?.lastname}
          </p>
          <p>
            <strong>Email:</strong> {customer?.email}
          </p>
          <p>
            <strong>Phone:</strong> {customer?.phone_no}
          </p>
          <p>
            <strong>Guests:</strong> {num_guest}
          </p>
          <p>
            <strong>Check-in:</strong> {checkIn_date}
          </p>
          <p>
            <strong>Check-out:</strong> {checkOut_date}
          </p>
          <p>
            <strong>Rooms:</strong> {rooms.join(", ")}
          </p>
          <p>
            <strong>Booking ID:</strong> {booking?.booking_id || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> Confirmed
          </p>
          <p>
            <strong>Total Price:</strong> RS.
            {totalPrice || booking?.total_price || 0}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Download Booking Details
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
