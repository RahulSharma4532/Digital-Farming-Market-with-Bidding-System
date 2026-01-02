export default function Disputes() {
  const disputes = [
    { id: 1, issue: "Payment not received", order: "#1023" },
    { id: 2, issue: "Quality issue", order: "#1045" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Disputes</h2>

      {disputes.map(d => (
        <div key={d.id} className="border-b py-3">
          <p className="font-semibold">{d.issue}</p>
          <p className="text-sm text-gray-500">Order {d.order}</p>
        </div>
      ))}
    </div>
  );
}
