import { useState, useEffect } from "react";
import bidService from "../../services/bidService";
import { Package, TrendingUp, CheckCircle, Clock } from "lucide-react";

export default function MyProducts() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAuctions = async () => {
      try {
        const token = localStorage.getItem("token");
        // We need a service method for this. Assuming I add getSellerAuctions to bidService.
        // If not, I'll use axios directly here or add it momentarily.
        // Let's assume I'll add it to bidService in the next step or use direct fetch if needed.
        // Actually, bidService doesn't have getSellerAuctions exposed yet? I should check.
        // I will add it to bidService first.
        const res = await bidService.getSellerAuctions(token);
        setAuctions(res);
      } catch (err) {
        console.error("Failed to fetch my auctions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyAuctions();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Inventory...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Package className="w-6 h-6 text-green-600" />
        My Inventory Setup
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => {
          const isEnded = new Date(auction.endTime) < new Date();
          const isSold = isEnded && auction.highestBidder;

          return (
            <div key={auction._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
              {isSold ? (
                <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Sold
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Active
                </div>
              )}

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{auction.product?.name || "Product"}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {auction.product?.quantity} {auction.product?.unit} • Grade {auction.product?.grade}
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500 text-xs uppercase font-bold">Current Price</span>
                    <span className="text-xl font-bold text-green-600">₹{auction.currentPrice}</span>
                  </div>
                  {isSold && (
                    <div className="pt-2 border-t border-gray-200 mt-2">
                      <p className="text-xs text-gray-500">Sold to: <span className="font-bold text-gray-700">{auction.highestBidder?.name || "Unknown"}</span></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {auctions.length === 0 && (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No active stock or auctions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}


