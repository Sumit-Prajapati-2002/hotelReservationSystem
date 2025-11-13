import { Routes, Route } from "react-router-dom";
import HotelLandingPage from "./pages/HotelLandingPage";
import RoomDetailsPageWrapper from "./pages/RoomDetailsPageWrapper";
import roomCategories from "./components/RoomCategory"; // your room data
import AvailableRoomsPageWrapper from "./pages/AvailableRoomsPageWrapper";
import FormPageWraper from "./pages/FormWrapperPage";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerLogin from "./pages/CustomerLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
export default function App() {
  return (
    <Routes>
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/customer-register" element={<CustomerRegister />} />
      <Route path="/" element={<HotelLandingPage />} />
      <Route
        path="/room-category/:categoryId/rooms"
        element={<AvailableRoomsPageWrapper roomCategories={roomCategories} />}
      />
      <Route
        path="/room-category/:categoryId"
        element={<RoomDetailsPageWrapper roomCategories={roomCategories} />}
      />
      <Route path="/form/:roomId" element={<FormPageWraper />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
