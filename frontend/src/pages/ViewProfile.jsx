import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "lucide-react";
import Header from "../components/layout/Header.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

export default function ViewProfile() {
  const { id } = useParams();
  const { selectedProfile, fetchProfileById } = useAppContext();

  useEffect(() => {
    fetchProfileById(id);
  }, [id, fetchProfileById]);

  if (!selectedProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Profile Details" />
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  const p = selectedProfile;

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Profile Details" />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            {p.profileImage ? (
              <img
                src={`${IMAGE_BASE_URL}${p.profileImage}`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
            )}

            <div className="text-white">
              <h2 className="text-lg sm:text-xl font-semibold">
                {p.firstName} {p.lastName}
              </h2>
              <p className="text-sm opacity-90 break-all">{p.email}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                <tr className="bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 font-medium text-gray-600">
                    Mobile
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">
                    {p.mobile || "-"}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 sm:px-6 py-3 font-medium text-gray-600">
                    Gender
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">
                    {p.gender}
                  </td>
                </tr>

                <tr className="bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 font-medium text-gray-600">
                    Status
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-4 sm:px-6 py-3 font-medium text-gray-600">
                    Location
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">
                    {p.location || "-"}
                  </td>
                </tr>

                <tr className="bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 font-medium text-gray-600">
                    Created At
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-gray-800">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
