import { useParams, useNavigate } from "react-router-dom";
import AvailableRooms from '../components/AvailableRooms'

export default function AvailableRoomsPageWrapper({ roomCategories }) {
  const { categoryId } = useParams(); // ✅ matches route param
  
    return (
      <div className="p-6">
        <AvailableRooms roomCategories={roomCategories} categoryId={categoryId} />
      </div>
    );
}
    