# 🚜 TerraFresh: Digital Farmer's Market with Live Bidding

TerraFresh is a high-end MERN stack marketplace designed to bridge the gap between local farmers and consumers. It features a real-time auction system, 3D immersive UI, and automated weather-based agricultural insights.

## 🚀 Key Features
* **Live Bidding System**: Real-time price updates using Socket.io and MongoDB transactions for data integrity.
* **3D Tactile UI**: Modern, responsive frontend built with React, Tailwind CSS, and Framer Motion.
* **Smart Categories**: Specialized marketplaces for Vegetables, Fruits, Organic Staples, Grains, Seeds, and Fresh Herbs.
* **Farmer Direct**: Secure platform for farmers to list produce and for consumers to bid transparently.

## 🛠️ Tech Stack
* **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React
* **Backend**: Node.js, Express.js, Socket.io
* **Database**: MongoDB Atlas (with ACID Transactions)
* **API Integration**: OpenWeather API for localized farm conditions

## 📦 Installation & Setup
1. **Clone the repository**:
   `git clone https://github.com/RahulSharma4532/Digital-Farming-Market-with-Bidding-System.git`
2. **Install Backend Dependencies**:
   `cd backend && npm install`
3. **Install Frontend Dependencies**:
   `cd frontend && npm install`
4. **Environment Variables**:
   Create a `.env` file in the root and add your `MONGO_URI`.
5. **Run the Application**:
   `npm run dev` (from root)
