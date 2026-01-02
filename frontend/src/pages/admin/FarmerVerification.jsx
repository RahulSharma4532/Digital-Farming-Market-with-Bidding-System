import { useState } from "react";

export default function FarmerVerification() {
  const [farmers, setFarmers] = useState([
    { id: 1, farm: "Green Valley Farms", owner: "Rajesh Kumar" },
    { id: 2, farm: "Sunrise Organics", owner: "Amit Sharma" },
  ]);

  const approve = (id) =>
    setFarmers(farmers.filter(f => f.id !== id));

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Farmer Verification</h2>

      {farmers.length === 0 && (
        <p className="text-gray-500 text-sm">No pending verifications</p>
      )}

      {farmers.map(f => (
        <div key={f.id} className="flex justify-between items-center border-b py-4">
          <div>
            <p className="font-semibold">{f.farm}</p>
            <p className="text-sm text-gray-500">Owner: {f.owner}</p>
          </div>

          <button
            onClick={() => approve(f.id)}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
