import React from 'react';
import { useCart } from '../../routes/CartContext';
import CartToast from './CartToast';

export default function GlobalToast() {
    const { showToast, setShowToast, toastProduct } = useCart();

    return (
        <CartToast
            show={showToast}
            onClose={() => setShowToast(false)}
            product={toastProduct}
        />
    );
}
