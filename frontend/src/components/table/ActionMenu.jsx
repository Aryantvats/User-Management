import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

export default function ActionMenu({ userId }) {
  const navigate = useNavigate();
  const { fetchProfiles } = useAppContext();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`/profiles/${userId}`);
      fetchProfiles();
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded hover:bg-gray-200"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-20">
          <button
            onClick={() => {
              navigate(`/profiles/view/${userId}`);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
          >
            <Eye size={16} className="text-green-600" />
            View
          </button>

          <button
            onClick={() => {
              navigate(`/profiles/edit/${userId}`);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
          >
            <Pencil size={16} className="text-blue-600" />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
