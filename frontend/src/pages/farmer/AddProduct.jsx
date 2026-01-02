export default function AddProduct() {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <p className="text-gray-500 text-sm mb-4">
        Create a new product listing for auction.
      </p>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          type="number"
          placeholder="Quantity (kg)"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          type="number"
          placeholder="Starting Price (₹)"
          className="w-full border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}


