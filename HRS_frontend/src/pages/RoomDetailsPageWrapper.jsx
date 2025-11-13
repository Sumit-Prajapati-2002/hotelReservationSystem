import { useParams } from "react-router-dom";
import RoomDetails from "../components/RoomDetails";

export default function RoomDetailsPageWrapper({ roomCategories }) {
  const { categoryId } = useParams(); // this is actually categoryId

  return (
    <div className="p-6">
      <RoomDetails categoryId={categoryId} />
    </div>
  );
}
