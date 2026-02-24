import axios from "axios";

// Update this if your API base URL is different
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_URL = `${BASE_URL}/auctions`;

const getAuctionDetails = async (auctionId) => {
    const response = await axios.get(`${API_URL}/${auctionId}`);
    return response.data;
};

const placeBid = async (auctionId, amount, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/bid`, { auctionId, amount }, config);
    return response.data;
};

const createAuction = async (auctionData, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${API_URL}/create`, auctionData, config);
    return response.data;
};

const getAllAuctions = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

const getSellerAuctions = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`${API_URL}/seller`, config);
    return response.data;
};

export default {
    getAuctionDetails,
    getAuction: getAuctionDetails,
    placeBid,
    createAuction,
    getAllAuctions,
    getSellerAuctions
};
