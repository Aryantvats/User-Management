import StatusDropdown from "./StatusDropdown.jsx";
import ActionMenu from "./ActionMenu.jsx";
import { User } from "lucide-react";

export default function UserRow({ user, index }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">{index}</td>

      <td className="p-2">
        {user.firstName} {user.lastName}
      </td>

      <td className="p-2">{user.email}</td>

      <td className="p-2">{user.gender}</td>

      <td className="p-2">
        <StatusDropdown
          userId={user._id}
          currentStatus={user.status}
        />
      </td>

      <td className="p-2">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <User className="w-8 h-8 text-gray-400" />
        )}
      </td>

      <td className="p-2">
        <ActionMenu userId={user._id} />
      </td>
    </tr>
  );
}
