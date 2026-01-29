import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext.jsx";
import Header from "../components/layout/Header.jsx";
import ProfileForm from "../components/profile/ProfileForm.jsx";

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProfiles } = useAppContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/profiles/${id}`)
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch(() => {
        toast.error("Failed to load profile");
        navigate("/profiles");
      });
  }, [id, navigate]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) formData.append(key, data[key]);
      });

      await axios.put(`/profiles/${id}`, formData);
      toast.success("Profile updated");
      await fetchProfiles();
      navigate("/profiles", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Edit Profile" />
      <div className="flex-1 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl py-6">
          <ProfileForm
            initialData={profile}
            onSubmit={handleUpdate}
            submitText="Update"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
