import { useState, useEffect } from "react";
import { User, Loader2 } from "lucide-react";

export default function ProfileForm({
  initialData = {},
  onSubmit,
  loading,
  submitText = "Submit",
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    status: "",
    location: "",
    profileImage: null,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl bg-white rounded-lg shadow-md border p-6"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        {initialData?.profileImage && !formData.profileImage?.name ? (
          <img
            src={initialData.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-10 h-10 text-gray-400" />
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">First name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter FirstName"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter LastName"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email address</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Mobile</label>
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Select Your Gender
          </label>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm text-gray-600">Select Your Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">Select...</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* File */}
        <div>
          <label className="text-sm text-gray-600">Select Your Profile</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm bg-white"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm text-gray-600">
            Enter Your Location
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Your Location"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-red-700 text-white py-2 rounded text-sm font-medium hover:bg-red-800 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        {submitText}
      </button>
    </form>
  );
}
