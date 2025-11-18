import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Header from "../../components/Header";
import CartProvider from "../../contexts/CartContext";
import useCart from "../../hooks/useCart";
import PropTypes from "prop-types";

function formatPrice(v) {
    try {
        return new Intl.NumberFormat("vi-VN").format(v) + "đ";
    } catch (e) {
        return v + "đ";
    }
}
export default function ShoppingCartPageWrapper() {
    return (
        <CartProvider>
            <ShoppingCartPage />
        </CartProvider>
    );
}
function ShoppingCartPage() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    useEffect(() => {
        let mounted = true;

        async function fetchProducts() {
            setLoading(true);
            try {
                const res = await fetch(
                    "https://api01.f8team.dev/api/products?limit=100"
                );
                const data = await res.json();

                if (!mounted) return;

                setProducts(data.data.items);
            } catch (e) {
                console.error("Failed to fetch products", e);
                setProducts([]);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchProducts();

        return () => (mounted = false);
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
lg:grid-cols-4 gap-4"
                    >
                        {products.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onAdd={addToCart}
                            />
                        ))}
                    </div>
                )}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Cart summary</h2>
                    <CartSummary />
                </section>
            </main>
        </div>
    );
}
function CartSummary() {
    const {
        items,
        totalQuantity,
        totalPrice,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useCart();
    if (totalQuantity === 0) return <div>Your cart is empty.</div>;
    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <div className="space-y-3">
                {items.map((it) => (
                    <div
                        key={it.id}
                        className="flex items-center justify-between"
                    >
                        <div>
                            <div className="font-medium">{it.name}</div>
                            <div className="text-sm text-gray-500">
                                {formatPrice(it.price)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    updateQuantity(it.id, it.quantity - 1)
                                }
                                type="button"
                                className="px-2 py-1 border rounded"
                            >
                                -
                            </button>
                            <div className="w-6 text-center">{it.quantity}</div>
                            <button
                                onClick={() =>
                                    updateQuantity(it.id, it.quantity + 1)
                                }
                                type="button"
                                className="px-2 py-1 border rounded"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeFromCart(it.id)}
                                type="button"
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t">
                    <div className="font-semibold">
                        Total: {formatPrice(totalPrice)}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={clearCart}
                            className="py-2 px-3 rounded bg
red-500 text-white"
                        >
                            Clear Cart
                        </button>
                        <button
                            className="py-2 px-3 rounded bg-green-600 text
white"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
