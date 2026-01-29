import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext.jsx";
import Header from "../components/layout/Header.jsx";
import ProfileForm from "../components/profile/ProfileForm.jsx";

export default function AddProfile() {
  const navigate = useNavigate();
  const { fetchProfiles } = useAppContext();

  const handleCreate = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) formData.append(key, data[key]);
      });

      await axios.post("/profiles", formData);
      toast.success("Profile created");
      await fetchProfiles();
      navigate("/profiles", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Register Your Details" />
      <div className="flex-1 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl py-6">
          <ProfileForm onSubmit={handleCreate} submitText="Submit" />
        </div>
      </div>
    </div>
  );
}
