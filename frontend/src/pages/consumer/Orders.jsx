// // pages/consumer/Orders.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, CheckCircle, Clock, Package, Truck, MapPin } from 'lucide-react';

// export default function Orders() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'delivered'

//   // Mock orders data - In real app, fetch from API
//   useEffect(() => {
//     const mockOrders = [
//       {
//         id: 'ORD-12345',
//         date: '2024-01-15',
//         status: 'delivered',
//         items: [
//           { name: 'Organic Tomatoes', qty: 2, price: 120 },
//           { name: 'Fresh Apples', qty: 1, price: 180 }
//         ],
//         total: 420,
//         deliveryAddress: '123 Main St, Mumbai, Maharashtra'
//       },
//       {
//         id: 'ORD-12346',
//         date: '2024-01-16',
//         status: 'pending',
//         items: [
//           { name: 'Basmati Rice', qty: 1, price: 120 },
//           { name: 'Brown Rice', qty: 2, price: 95 }
//         ],
//         total: 310,
//         deliveryAddress: '456 Park Ave, Delhi'
//       }
//     ];
//     setOrders(mockOrders);
//   }, []);

//   const filteredOrders = orders.filter(order => {
//     if (activeTab === 'all') return true;
//     if (activeTab === 'pending') return order.status === 'pending';
//     if (activeTab === 'delivered') return order.status === 'delivered';
//     return true;
//   });

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
//       case 'pending': return <Clock className="w-5 h-5 text-orange-600" />;
//       default: return <Package className="w-5 h-5 text-gray-600" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white px-6 py-4 border-b flex items-center justify-between sticky top-0 z-50">
//         <div className="flex items-center">
//           <button onClick={() => navigate(-1)} className="mr-4">
//             <ArrowLeft />
//           </button>
//           <h1 className="text-xl font-bold">My Orders</h1>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white border-b">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="flex space-x-8">
//             {['all', 'pending', 'delivered'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-4 px-1 font-semibold text-sm uppercase tracking-wider border-b-2 transition-colors ${
//                   activeTab === tab
//                     ? 'border-[#1a5d36] text-[#1a5d36]'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Orders List */}
//       <div className="max-w-6xl mx-auto p-6">
//         {filteredOrders.length === 0 ? (
//           <div className="text-center py-12">
//             <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//             <h2 className="text-2xl font-bold text-gray-700 mb-2">No orders found</h2>
//             <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
//             <button 
//               onClick={() => navigate('/consumer/home')}
//               className="bg-[#1a5d36] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
//             >
//               Start Shopping
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredOrders.map((order) => (
//               <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
//                 {/* Order Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <h2 className="text-lg font-bold">Order #{order.id}</h2>
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
//                         {order.status.toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-gray-500 text-sm">Placed on {order.date}</p>
//                   </div>
//                   <div className="flex items-center gap-2 mt-2 sm:mt-0">
//                     {getStatusIcon(order.status)}
//                     <span className="font-bold text-lg">₹{order.total}</span>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="mb-6">
//                   <h3 className="font-bold mb-4">Items</h3>
//                   <div className="space-y-3">
//                     {order.items.map((item, index) => (
//                       <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
//                         <div>
//                           <span className="font-medium">{item.name}</span>
//                           <span className="text-gray-500 text-sm ml-2">×{item.qty}</span>
//                         </div>
//                         <span className="font-bold">₹{item.price * item.qty}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Delivery Address */}
//                 <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
//                   <MapPin className="w-5 h-5 text-gray-600 mt-1" />
//                   <div>
//                     <h4 className="font-bold mb-1">Delivery Address</h4>
//                     <p className="text-gray-600">{order.deliveryAddress}</p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
//                   {order.status === 'pending' && (
//                     <button className="px-4 py-2 bg-[#1a5d36] text-white rounded-lg font-semibold hover:bg-green-800">
//                       Track Order
//                     </button>
//                   )}
//                   <button className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
//                     View Details
//                   </button>
//                   <button className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
//                     Reorder
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// pages/consumer/Orders.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Package, 
  Truck, 
  MapPin,
  RefreshCw,
  ChevronRight,
  Star,
  Calendar,
  CreditCard,
  Shield,
  Repeat,
  Download,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data - In real app, fetch from API
  useEffect(() => {
    const fetchOrders = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockOrders = [
          {
            id: 'ORD-78945',
            date: '2024-03-15',
            time: '10:30 AM',
            status: 'delivered',
            deliveryDate: '2024-03-15',
            items: [
              { id: 1, name: 'Organic Tomatoes', qty: 2, price: 120, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150', rating: 4.5 },
              { id: 2, name: 'Fresh Apples - Kashmir', qty: 1, price: 180, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150', rating: 4.8 }
            ],
            total: 420,
            deliveryAddress: 'Green Valley Apartments, 123 Main St, Bandra West, Mumbai, Maharashtra - 400050',
            deliveryAgent: 'Rajesh Kumar',
            agentPhone: '+91 98765 43210',
            paymentMethod: 'UPI',
            paymentStatus: 'paid',
            trackingId: 'TRK-789456123',
            estimatedDelivery: '2-4 hours',
            farmerDetails: [
              { name: 'Organic Farms Coop', location: 'Nashik, Maharashtra' },
              { name: 'Kashmir Apple Growers', location: 'Srinagar, Kashmir' }
            ]
          },
          {
            id: 'ORD-78946',
            date: '2024-03-16',
            time: '02:15 PM',
            status: 'on_the_way',
            deliveryDate: '2024-03-16',
            items: [
              { id: 3, name: 'Basmati Rice (Premium)', qty: 1, price: 450, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150' },
              { id: 4, name: 'Brown Rice (Organic)', qty: 2, price: 280, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150' },
              { id: 5, name: 'Toor Dal', qty: 1, price: 120, image: 'https://images.unsplash.com/photo-1587271407850-8d6ca5c6a683?w=150' }
            ],
            total: 1130,
            deliveryAddress: 'Sunrise Towers, 456 Park Avenue, Connaught Place, New Delhi - 110001',
            deliveryAgent: 'Amit Sharma',
            agentPhone: '+91 87654 32109',
            paymentMethod: 'Credit Card',
            paymentStatus: 'paid',
            trackingId: 'TRK-456123789',
            estimatedDelivery: '30 minutes',
            farmerDetails: [
              { name: 'Punjab Rice Mills', location: 'Amritsar, Punjab' }
            ]
          },
          {
            id: 'ORD-78947',
            date: '2024-03-14',
            time: '11:45 AM',
            status: 'pending',
            deliveryDate: '2024-03-14',
            items: [
              { id: 6, name: 'Fresh Broccoli', qty: 3, price: 60, image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=150' },
              { id: 7, name: 'Carrots (Organic)', qty: 2, price: 40, image: 'https://images.unsplash.com/photo-1598170845058-78131a90f4bf?w=150' }
            ],
            total: 260,
            deliveryAddress: 'Lakeview Residency, 789 MG Road, Bangalore, Karnataka - 560001',
            deliveryAgent: 'Suresh Patel',
            agentPhone: '+91 76543 21098',
            paymentMethod: 'Cash on Delivery',
            paymentStatus: 'pending',
            trackingId: 'TRK-123789456',
            estimatedDelivery: 'Processing',
            farmerDetails: [
              { name: 'Organic Greens Farm', location: 'Hosur, Tamil Nadu' }
            ]
          },
          {
            id: 'ORD-78948',
            date: '2024-03-10',
            time: '09:20 AM',
            status: 'cancelled',
            deliveryDate: '2024-03-10',
            items: [
              { id: 8, name: 'Mangoes (Alphonso)', qty: 5, price: 200, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150' }
            ],
            total: 1000,
            deliveryAddress: 'Seaside Apartments, 101 Marine Drive, Kochi, Kerala - 682001',
            deliveryAgent: 'Not assigned',
            agentPhone: null,
            paymentMethod: 'UPI',
            paymentStatus: 'refunded',
            trackingId: 'TRK-987654321',
            estimatedDelivery: 'Cancelled',
            farmerDetails: [
              { name: 'Konkan Mango Farms', location: 'Ratnagiri, Maharashtra' }
            ],
            cancellationReason: 'Out of stock'
          }
        ];
        setOrders(mockOrders);
        setIsLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return order.status === 'pending';
    if (activeTab === 'delivered') return order.status === 'delivered';
    if (activeTab === 'on_the_way') return order.status === 'on_the_way';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'delivered':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'bg-green-100 text-green-800',
          textColor: 'text-green-600',
          bgColor: 'bg-green-50',
          label: 'Delivered',
          progress: 100
        };
      case 'on_the_way':
        return {
          icon: <Truck className="w-5 h-5" />,
          color: 'bg-blue-100 text-blue-800',
          textColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          label: 'On the Way',
          progress: 70
        };
      case 'pending':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'bg-orange-100 text-orange-800',
          textColor: 'text-orange-600',
          bgColor: 'bg-orange-50',
          label: 'Processing',
          progress: 30
        };
      case 'cancelled':
        return {
          icon: <Package className="w-5 h-5" />,
          color: 'bg-red-100 text-red-800',
          textColor: 'text-red-600',
          bgColor: 'bg-red-50',
          label: 'Cancelled',
          progress: 0
        };
      default:
        return {
          icon: <Package className="w-5 h-5" />,
          color: 'bg-gray-100 text-gray-800',
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          label: 'Unknown',
          progress: 0
        };
    }
  };

  const handleReorder = (order) => {
    // In real app, add items to cart
    console.log('Reordering:', order.id);
    alert(`Adding ${order.items.length} items to cart!`);
  };

  const handleTrackOrder = (order) => {
    navigate(`/consumer/orders/track/${order.id}`);
  };

  const handleRateOrder = (order) => {
    setSelectedOrder(order);
    // Open rating modal
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="bg-white px-6 py-4 border-b shadow-sm flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
        </div>
        <div className="max-w-6xl mx-auto p-8 flex flex-col items-center justify-center">
          <RefreshCw className="w-12 h-12 text-green-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Order History</h1>
              <p className="text-sm text-gray-500">{orders.length} total orders</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/consumer/home')}
            className="bg-gradient-to-r from-[#1a5d36] to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Shop More
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'all', label: 'All Orders', count: orders.length },
              { id: 'pending', label: 'Processing', count: orders.filter(o => o.status === 'pending').length },
              { id: 'on_the_way', label: 'On the Way', count: orders.filter(o => o.status === 'on_the_way').length },
              { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
              { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
            ].map((tab) => {
              const config = getStatusConfig(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? `${config.textColor} border-current`
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  {tab.id !== 'all' && config.icon}
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id ? 'bg-current/20' : 'bg-gray-100'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative mb-8">
              <Package className="w-32 h-32 text-green-200 mx-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📦</span>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No orders found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {activeTab === 'all' 
                ? "You haven't placed any orders yet. Start shopping for fresh farm produce!"
                : `No ${activeTab} orders at the moment.`}
            </p>
            <button 
              onClick={() => navigate('/consumer/home')}
              className="bg-gradient-to-r from-[#1a5d36] to-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const status = getStatusConfig(order.status);
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  {/* Order Header */}
                  <div className="p-6 border-b">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${status.bgColor}`}>
                          {status.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-lg font-bold text-gray-900">Order #{order.id}</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{order.date} • {order.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CreditCard className="w-4 h-4" />
                              <span className="capitalize">{order.paymentMethod}</span>
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                order.paymentStatus === 'paid' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.paymentStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">₹{order.total}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Order Status</span>
                        <span className="font-medium">{status.label}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${status.textColor.replace('text-', 'bg-')} transition-all duration-500`}
                          style={{ width: `${status.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 border-b">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Package className="w-4 h-4" /> Items ({order.items.length})
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-gray-600">Qty: {item.qty}</span>
                              <span className="text-gray-600">Price: ₹{item.price}</span>
                              {item.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm">{item.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{item.price * item.qty}</div>
                            {order.status === 'delivered' && (
                              <button 
                                onClick={() => handleRateOrder(order)}
                                className="text-sm text-green-600 hover:text-green-800 mt-1"
                              >
                                Rate Product
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="p-6 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Delivery Address</h4>
                            <p className="text-sm text-gray-600 mt-1">{order.deliveryAddress}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Truck className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Delivery Agent</h4>
                            <p className="text-gray-600">{order.deliveryAgent}</p>
                            {order.agentPhone && (
                              <p className="text-sm text-gray-500">{order.agentPhone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <h4 className="font-bold text-gray-800 mb-3">Order Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tracking ID</span>
                              <span className="font-mono font-bold">{order.trackingId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Estimated Delivery</span>
                              <span className="font-medium">{order.estimatedDelivery}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Farmers</span>
                              <span className="font-medium">{order.farmerDetails.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 bg-gray-50">
                    <div className="flex flex-wrap gap-3">
                      {order.status === 'on_the_way' && (
                        <button 
                          onClick={() => handleTrackOrder(order)}
                          className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Truck className="w-5 h-5" />
                          Track Order Live
                        </button>
                      )}
                      
                      {order.status === 'delivered' && (
                        <>
                          <button 
                            onClick={() => handleReorder(order)}
                            className="flex-1 min-w-[200px] bg-gradient-to-r from-[#1a5d36] to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                            <Repeat className="w-5 h-5" />
                            Reorder All Items
                          </button>
                          <button 
                            onClick={() => handleRateOrder(order)}
                            className="flex-1 min-w-[200px] bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                            <Star className="w-5 h-5" />
                            Rate & Review
                          </button>
                        </>
                      )}

                      {order.status === 'pending' && (
                        <button 
                          className="flex-1 min-w-[200px] bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Clock className="w-5 h-5" />
                          View Processing Status
                        </button>
                      )}

                      <button 
                        onClick={() => navigate(`/consumer/orders/${order.id}`)}
                        className="flex-1 min-w-[200px] border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Details
                      </button>

                      <button className="flex-1 min-w-[200px] border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Download Invoice
                      </button>

                      <button className="flex-1 min-w-[200px] border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Support Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Need Help with an Order?</h3>
              <p className="text-gray-600 mb-4">
                Our customer support team is available 24/7 to help with any order-related queries.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white border border-blue-200 text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  📞 Call Support: 1800-123-4567
                </button>
                <button className="bg-white border border-blue-200 text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  💬 Live Chat
                </button>
                <button className="bg-white border border-blue-200 text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  📧 Email Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}