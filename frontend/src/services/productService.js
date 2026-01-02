import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

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
