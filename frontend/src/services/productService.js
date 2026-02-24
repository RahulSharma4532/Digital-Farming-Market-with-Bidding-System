import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api';
const API_URL = `${BASE_URL}/products`;

const getMyProducts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/my`, config);
    return response.data;
};

const createProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, productData, config);
    return response.data;
};

const productService = {
    getMyProducts,
    createProduct,
};

export default productService;
