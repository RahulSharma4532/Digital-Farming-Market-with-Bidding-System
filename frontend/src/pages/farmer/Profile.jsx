export default function Profile() {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Farmer Profile</h2>

      <input className="input" defaultValue="Rajesh Kumar" />
      <input className="input" defaultValue="Green Valley Farms" />
      <input className="input" defaultValue="+91 98765 43210" />
      <input className="input" defaultValue="rajesh@farm.com" />

      <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
}
