import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Check,
  X,
} from "lucide-react";

export default function BookingForm() {
  const { roomId } = useParams();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_no: "",
    nationality: "",
    citizenship: "",
    checkIn_date: new Date(),
    checkOut_date: new Date(),
    num_guest: 1,
    customer_id: null,
    rooms: roomId ? [{ room_id: Number(roomId) }] : [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Simulate fetching logged-in customer info
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch("http://localhost:3000/customer/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          const {
            firstname,
            lastname,
            email,
            phone_no,
            nationality,
            citizenship,
            customer_id,
          } = data.customer;
          setFormData((prev) => ({
            ...prev,
            firstname,
            lastname,
            email,
            phone_no,
            nationality,
            citizenship,
            customer_id,
          }));
        }
      } catch (err) {
        console.log("Guest booking");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading form...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Calendar size={32} />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Book Your Stay</h2>
                <p className="text-amber-100 mt-1">
                  Complete your reservation details
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="m-6 p-6 bg-green-50 border-2 border-green-500 rounded-2xl animate-slideDown">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <Check size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-800 text-lg">
                    Booking Successful!
                  </p>
                  <p className="text-green-700">
                    Your reservation has been confirmed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="m-6 p-6 bg-red-50 border-2 border-red-500 rounded-2xl">
              <p className="text-red-700 flex items-center gap-2">
                <X size={20} />
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
                <Users size={24} className="text-amber-600" /> Personal
                Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  readOnly={!!formData.customer_id}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  readOnly={!!formData.customer_id}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-amber-600" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={!!formData.customer_id}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <Phone size={18} className="text-amber-600" /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone_no"
                    placeholder="Phone Number"
                    value={formData.phone_no}
                    onChange={handleChange}
                    readOnly={!!formData.customer_id}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <Globe size={18} className="text-amber-600" /> Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    readOnly={!!formData.customer_id}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <CreditCard size={18} className="text-amber-600" />{" "}
                    Citizenship
                  </label>
                  <input
                    type="text"
                    name="citizenship"
                    placeholder="Citizenship Number"
                    value={formData.citizenship}
                    onChange={handleChange}
                    readOnly={!!formData.customer_id}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-6 pt-6 border-t-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
                <Calendar size={24} className="text-amber-600" /> Booking
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="checkIn_date"
                  value={formData.checkIn_date.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      checkIn_date: new Date(e.target.value),
                    }))
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                />
                <input
                  type="date"
                  name="checkOut_date"
                  value={formData.checkOut_date.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      checkOut_date: new Date(e.target.value),
                    }))
                  }
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
                />
              </div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <Users size={18} className="text-amber-600" />
                Number of Guests
              </label>
              <input
                type="number"
                name="num_guest"
                min={1}
                value={formData.num_guest}
                onChange={handleChange}
                placeholder="Number of Guests"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                "Complete Booking"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
