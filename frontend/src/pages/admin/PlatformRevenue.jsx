export default function PlatformRevenue() {
  const data = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18500 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 24500 },
    { month: "May", revenue: 22500 },
    { month: "Jun", revenue: 30450 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Platform Revenue</h2>

      {data.map((d, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <span>{d.month}</span>
          <span className="font-semibold">₹{d.revenue}</span>
        </div>
      ))}
    </div>
  );
}
