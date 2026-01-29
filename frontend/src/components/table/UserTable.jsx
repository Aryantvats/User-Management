import UserRow from "./UserRow.jsx";

export default function UserTable({ users, page, limit }) {
  return (
    <div className="border border-gray-300 rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Full Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Gender</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Profile</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <UserRow
              key={user._id}
              user={user}
              index={(page - 1) * limit + index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
