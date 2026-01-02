import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ConsumerHome from "../pages/consumer/ConsumerHome";
import Vegetables from "../pages/consumer/Vegetables";
import Fruits from "../pages/consumer/Fruits";
import Cart from "../pages/consumer/Cart";
import GrainsAndCereals from "../pages/consumer/Grains&Cereals";
import DairyProducts from "../pages/consumer/DairyProducts";
import OrganicPage from "../pages/consumer/Organic";
import SeedsPage from "../pages/consumer/Seeds&Plants";
import SpicesPage from "../pages/consumer/Spices";
import HerbsPage from "../pages/consumer/FreshHerbs";
import Orders from "../pages/consumer/Orders";
import Checkout from "../pages/consumer/Checkout";
import ConsumerProfile from "../pages/consumer/Profile";
import AuctionList from "../pages/consumer/AuctionList";
import AuctionItem from "../components/AuctionItem"; // Premium UI Component
import AdminDashboard from "../pages/admin/AdminDashboard";
import Analytics from "../pages/admin/Analytics";
import Disputes from "../pages/admin/Disputes";
import FarmerVerification from "../pages/admin/FarmerVerification";
import PlatformRevenue from "../pages/admin/PlatformRevenue";
import UserManagement from "../pages/admin/UserManagement";
import AdminLiveMonitor from "../pages/admin/AdminLiveMonitor"; // Imported Monitor
import FarmerLayout from "../pages/farmer/FarmerLayout";
import FarmerDashboard from "../pages/farmer/FarmerDashboard";
import FarmerBidding from "../pages/farmer/FarmerBidding";
import Earnings from "../pages/farmer/Earnings";
import FarmerProfile from "../pages/farmer/Profile";
import Verification from "../pages/farmer/Verification";
import MyProducts from "../pages/farmer/MyProducts";
import FarmerBuying from "../pages/farmer/FarmerBuying";
import FarmerSeeds from "../pages/farmer/market/FarmerSeeds";
import FarmerFertilizers from "../pages/farmer/market/FarmerFertilizers";
import FarmerEquipments from "../pages/farmer/market/FarmerEquipments";
import FarmerPesticides from "../pages/farmer/market/FarmerPesticides";
import FarmerCart from "../pages/farmer/market/FarmerCart";
import { CartProvider } from './CartContext';
import { AuthProvider } from '../context/AuthContext';
import { LocationProvider } from '../context/LocationContext';
import GlobalToast from '../components/common/GlobalToast';

export default function AppRouter() {
  return (
    <AuthProvider>
      <CartProvider>
        <LocationProvider>
          <GlobalToast />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Consumer Routes */}
            <Route path="/consumer/home" element={<ConsumerHome />} />
            <Route path="/consumer/vegetables" element={<Vegetables />} />
            <Route path="/consumer/fruits" element={<Fruits />} />
            <Route path="/consumer/grains" element={<GrainsAndCereals />} />
            <Route path="/consumer/dairy" element={<DairyProducts />} />
            <Route path="/consumer/organic" element={<OrganicPage />} />
            <Route path="/consumer/seeds" element={<SeedsPage />} />
            <Route path="/consumer/spices" element={<SpicesPage />} />
            <Route path="/consumer/herbs" element={<HerbsPage />} />
            <Route path="/consumer/cart" element={<Cart />} />
            <Route path="/consumer/orders" element={<Orders />} />
            <Route path="/consumer/checkout" element={<Checkout />} />
            <Route path="/consumer/profile" element={<ConsumerProfile />} />

            {/* Auction Routes */}
            <Route path="/consumer/auctions" element={<AuctionList />} />
            <Route path="/consumer/auctions/:id" element={<AuctionItem />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/disputes" element={<Disputes />} />
            <Route path="/admin/farmer-verification" element={<FarmerVerification />} />
            <Route path="/admin/revenue" element={<PlatformRevenue />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/live" element={<AdminLiveMonitor />} /> {/* New Admin Route */}

            {/* Farmer Routes */}
            <Route path="/farmer" element={<FarmerLayout />}>
              <Route index element={<FarmerDashboard />} />
              <Route path="inventory" element={<FarmerBidding />} />
              <Route path="live" element={<FarmerBidding />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="profile" element={<FarmerProfile />} />
              <Route path="verification" element={<Verification />} />
              <Route path="products" element={<MyProducts />} />
              <Route path="buy" element={<FarmerBuying />} >
                <Route path="seeds" element={<FarmerSeeds />} />
                <Route path="fertilizers" element={<FarmerFertilizers />} />
                <Route path="equipment" element={<FarmerEquipments />} />
                <Route path="pesticides" element={<FarmerPesticides />} />
                <Route path="cart" element={<FarmerCart />} />
              </Route>
            </Route>

            <Route path="*" element={<h1 className="p-6">Page Not Found</h1>} />
          </Routes>
        </LocationProvider>
      </CartProvider>
    </AuthProvider>
  );
}
