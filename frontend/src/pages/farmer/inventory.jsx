import { useState } from 'react';
import { Package, Plus, DollarSign, Image as ImageIcon, Tag, Upload, Zap } from 'lucide-react';

export default function Inventory() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Vegetables',
        qty: '',
        unit: 'kg',
        price: '',
        description: '',
        image: '',
        isLive: false,
        startTime: ''
    });

    const categories = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Spices', 'Herbs', 'Seeds'];
    const units = ['kg', 'dozen', 'liter', 'gram', 'bundle'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        console.log('Product Data:', formData);

        setTimeout(() => {
            setLoading(false);
            alert('Product added successfully!');
            // Reset form or redirect
        }, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
                    <p className="text-gray-500">Add new products to your farm listing</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Package className="w-5 h-5 text-green-600" />
                                Product Details
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Organic Red Tomatoes"
                                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none appearance-none bg-white"
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            name="qty"
                                            value={formData.qty}
                                            onChange={handleInputChange}
                                            placeholder="100"
                                            className="w-2/3 px-4 py-3 border rounded-l-xl focus:ring-2 focus:ring-green-500 outline-none"
                                            required
                                        />
                                        <select
                                            name="unit"
                                            value={formData.unit}
                                            onChange={handleInputChange}
                                            className="w-1/3 px-2 py-3 border-y border-r rounded-r-xl bg-gray-50 outline-none"
                                        >
                                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Describe freshness, harvest date, variety..."
                                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                ></textarea>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="space-y-4">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                Pricing & Auction
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="40"
                                            className="w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            placeholder="https://..."
                                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Go Live Toggle */}
                            <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${formData.isLive ? 'border-green-500 bg-green-50' : 'border-gray-200'
                                }`}>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.isLive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">Start Live Auction</h3>
                                            <p className="text-sm text-gray-500">Enable real-time bidding immediately</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="isLive"
                                            checked={formData.isLive}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div className={`w-12 h-6 rounded-full transition-colors ${formData.isLive ? 'bg-green-500' : 'bg-gray-300'
                                            }`}></div>
                                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isLive ? 'translate-x-6' : ''
                                            }`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-[#1a5d36] text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
                                    }`}
                            >
                                {loading ? (
                                    'Adding Product...'
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Add Product to Inventory
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview Card */}
                <div className="hidden lg:block">
                    <div className="sticky top-6">
                        <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Preview</h3>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
                            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon className="w-12 h-12 text-gray-300" />
                                )}
                                {formData.isLive && (
                                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                        LIVE
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{formData.name || 'Product Name'}</h3>
                                        <p className="text-sm text-gray-500">{formData.category} • {formData.unit}</p>
                                    </div>
                                    <span className="font-bold text-green-700 bg-green-50 px-2 py-1 rounded-lg">
                                        ₹{formData.price || '0'}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                    {formData.description || 'No description provided yet.'}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t">
                                    <Package className="w-4 h-4" />
                                    <span>Stock: {formData.qty || '0'} {formData.unit}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
