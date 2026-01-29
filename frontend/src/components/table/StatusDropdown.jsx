import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

export default function StatusDropdown({ userId, currentStatus }) {
  const { fetchProfiles } = useAppContext();

  const handleChange = async (e) => {
    try {
      await axios.patch(`/profiles/${userId}/status`, {
        status: e.target.value,
      });

      fetchProfiles();
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentStatus}
        onChange={handleChange}
        className="appearance-none bg-red-600 text-white px-3 py-1 pr-8 rounded cursor-pointer"
      >
        <option value="Active" className="bg-white text-black">Active</option>
        <option value="Inactive" className="bg-white text-black">Inactive</option>
      </select>

      <ChevronDown
        size={16}
        className="absolute right-2 pointer-events-none text-white"
      />
    </div>
  );
}
