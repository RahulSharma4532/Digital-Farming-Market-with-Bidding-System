export default function UserManagement() {
  const users = [
    { id: 1, name: "Ramesh", role: "Consumer", status: "Active" },
    { id: 2, name: "Rajesh", role: "Farmer", status: "Active" },
    { id: 3, name: "Suresh", role: "Consumer", status: "Blocked" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left py-2">Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{u.name}</td>
              <td className="text-center">{u.role}</td>
              <td className="text-center">{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
