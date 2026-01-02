import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bidService from "../../services/bidService";
import productService from "../../services/productService";
import { Gavel, Clock, Plus, Tag, ArrowRight, AlertCircle, Package } from "lucide-react";
import CountdownTimer from "../../components/CountdownTimer";

const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);
    const [products, setProducts] = useState([]);
    const [newAuction, setNewAuction] = useState({
        product: "",
        startingPrice: "",
        endTime: "",
    });
    const [newProduct, setNewProduct] = useState({ name: "", category: "Vegetables" }); // Quick add product state
    const [showProductForm, setShowProductForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    // Fetch User's Products
                    const myProducts = await productService.getMyProducts(token);
                    setProducts(myProducts);
                    if (myProducts.length > 0) {
                        setNewAuction(prev => ({ ...prev, product: myProducts[0]._id }));
                    }
                }
                // Fetch All Auctions
                const res = await bidService.getAllAuctions();
                setAuctions(res); // Service returns data directly
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCreateAuction = async (e) => {
        e.preventDefault();
        setError("");

        if (!newAuction.product) {
            setError("Please select a product first.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) return alert("Please login");

        try {
            // Backend expects 'productId', but state uses 'product'
            const payload = {
                productId: newAuction.product,
                startingPrice: newAuction.startingPrice,
                endTime: newAuction.endTime
            };
            const res = await bidService.createAuction(payload, token);

            // Add 'product' details manually to the new auction object for correct display before refresh
            const productDetails = products.find(p => p._id === newAuction.product);
            const auctionWithDetails = { ...res, product: productDetails || res.product };

            setAuctions([...auctions, auctionWithDetails]);
            setNewAuction({ ...newAuction, startingPrice: "", endTime: "" });
            alert("Auction Created!");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to create auction");
        }
    };

    const handleQuickAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to add a product.");
            return;
        }

        try {
            console.log("Sending product data:", newProduct);
            const res = await productService.createProduct(newProduct, token);
            console.log("Product created:", res);
            setProducts([...products, res]);
            setNewAuction(prev => ({ ...prev, product: res._id })); // Auto-select new product
            setNewProduct({ name: "", category: "Vegetables" });
            setShowProductForm(false);
            alert("Product Added Successfully!");
        } catch (err) {
            console.error("Add Product Error:", err);
            const errMsg = err.response?.data?.message || err.message || "Failed to add product";
            alert(`Error: ${errMsg}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] p-8 font-sans text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
                            <Gavel className="w-10 h-10 text-green-500" />
                            Live Auctions
                        </h1>
                        <p className="text-gray-400 text-lg">Bid on fresh produce in real-time.</p>
                    </div>
                </div>

                {/* Create Auction Section */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Plus className="w-6 h-6 text-green-400" />
                            Start New Auction
                        </h2>
                        <button
                            onClick={() => setShowProductForm(!showProductForm)}
                            className="text-sm text-green-400 hover:text-green-300 font-bold flex items-center gap-1"
                        >
                            {showProductForm ? "Cancel Adding Product" : "+ Add New Product"}
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    {/* Quick Add Product Form */}
                    {showProductForm && (
                        <div className="mb-6 p-6 bg-white/5 rounded-2xl border border-green-500/30">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Package className="w-5 h-5" /> Quick Add Product</h3>
                            <form onSubmit={handleQuickAddProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <input
                                    type="text" placeholder="Name (e.g. Tomatoes)"
                                    className="col-span-1 md:col-span-2 bg-[#0f172a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    required
                                />
                                <select
                                    className="bg-[#0f172a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option>Vegetables</option>
                                    <option>Fruits</option>
                                    <option>Grains</option>
                                    <option>Spices</option>
                                </select>
                                <div className="flex gap-2">
                                    <input
                                        type="number" placeholder="Qty"
                                        className="w-20 bg-[#0f172a] border border-white/20 rounded-xl px-2 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={newProduct.quantity || ""} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                                    />
                                    <input
                                        type="text" placeholder="Unit (kg)"
                                        className="w-24 bg-[#0f172a] border border-white/20 rounded-xl px-2 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={newProduct.unit || ""} onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="text" placeholder="Grade (e.g. A)"
                                    className="bg-[#0f172a] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={newProduct.grade || ""} onChange={(e) => setNewProduct({ ...newProduct, grade: e.target.value })}
                                />
                                <button type="submit" className="col-span-1 md:col-span-5 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl mt-2">Add Product to Inventory</button>
                            </form>
                        </div>
                    )}

                    <form onSubmit={handleCreateAuction} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Select Product</label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                <select
                                    className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all appearance-none cursor-pointer"
                                    value={newAuction.product}
                                    onChange={(e) => setNewAuction({ ...newAuction, product: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Choose a product...</option>
                                    {products.map(p => (
                                        <option key={p._id} value={p._id} className="bg-[#0f172a]">
                                            {p.name} ({p.category})
                                        </option>
                                    ))}
                                </select>
                                {products.length === 0 && !loading && (
                                    <p className="text-xs text-yellow-500 mt-1">No products found. Add one first!</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Starting Price (₹)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-gray-600"
                                value={newAuction.startingPrice}
                                onChange={(e) => setNewAuction({ ...newAuction, startingPrice: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">End Time</label>
                            <div className="relative">
                                <input
                                    type="datetime-local"
                                    className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all [color-scheme:dark]"
                                    value={newAuction.endTime}
                                    onChange={(e) => setNewAuction({ ...newAuction, endTime: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={products.length === 0}
                                className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2
                    ${products.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                Create Auction
                            </button>
                        </div>
                    </form>
                </div>

                {/* Auction Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {auctions.map((auction) => (
                        <Link to={`/consumer/auctions/${auction._id}`} key={auction._id} className="group">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative">
                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Live
                                    </span>
                                </div>

                                <div className="p-6 pt-12">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {auction.product && typeof auction.product === 'object' ? `${auction.product.name}` : `Product #${auction.product ? auction.product.toString().substring(0, 8) : "N/A"}`}
                                        </h3>
                                        <p className="text-gray-400 text-sm">Hosted by Seller</p>
                                    </div>

                                    <div className="flex items-center justify-between mb-6 p-4 bg-black/20 rounded-xl">
                                        <div>
                                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Current Bid</p>
                                            <p className="text-2xl font-black text-green-400">₹{auction.currentPrice}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Ends In</p>
                                            <div className="flex items-center gap-1 text-white font-mono text-sm">
                                                <Clock className="w-4 h-4 text-orange-400" />
                                                <CountdownTimer endTime={auction.endTime} />
                                            </div>
                                        </div>
                                    </div>

                                    <button className={`w-full font-bold py-3 rounded-xl border transition-colors flex items-center justify-center gap-2 
                                        ${JSON.parse(localStorage.getItem("user"))?.role === 'farmer'
                                            ? 'bg-blue-600/20 text-blue-300 border-blue-500/30 cursor-default'
                                            : 'bg-white/10 hover:bg-white/20 text-white border-white/10 group-hover:bg-green-600 group-hover:border-green-600'}`}>
                                        {JSON.parse(localStorage.getItem("user"))?.role === 'farmer' ? "View Status" : "Join Bidding"}
                                        {JSON.parse(localStorage.getItem("user"))?.role !== 'farmer' && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                    {auctions.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                            <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                                <Gavel className="w-12 h-12 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-300 mb-2">No Active Auctions</h3>
                            <p className="text-gray-500">Create an auction above to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuctionList;
