import PropTypes from "prop-types";
import useCart from "../hooks/useCart";
function formatPrice(v) {
    try {
        return new Intl.NumberFormat("vi-VN").format(v) + "đ";
    } catch (e) {
        return v + "đ";
    }
}
export default function CartDropdown({ className = "" }) {
    const { items, totalPrice, removeFromCart, updateQuantity, clearCart } =
        useCart();
    return (
        <div className={`w-80 bg-white shadow-lg rounded-md p-3 ${className}`}>
            <h4 className="font-semibold mb-2">Cart</h4>
            {items.length === 0 ? (
                <div className="text-sm text-gray-500">Your cart is empty.</div>
            ) : (
                <div className="space-y-3">
                    {items.map((it) => (
                        <div key={it.id} className="flex items-center gap-3">
                            <div className="flex-1 text-sm">
                                <div className="font-medium truncate">
                                    {it.name}
                                </div>
                                <div
                                    className="text-xs text
gray-500"
                                >
                                    {formatPrice(it.price)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        updateQuantity(it.id, it.quantity - 1)
                                    }
                                    className="px-2 py-1 border rounded"
                                    type="button"
                                ></button>
                                <div className="w-6 text-center">
                                    {it.quantity}
                                </div>
                                <button
                                    onClick={() =>
                                        updateQuantity(it.id, it.quantity + 1)
                                    }
                                    className="px-2 py-1 border rounded"
                                    type="button"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(it.id)}
                                    className="ml-2 text-red-500 text-xs"
                                    type="button"
                                >
                                    x
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="border-t pt-2 flex items-center justify-between">
                        <div className="text-sm font-semibold">Total:</div>
                        <div className="text-sm font-semibold">
                            {formatPrice(totalPrice)}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={clearCart}
                            className="flex-1 py-2 rounded bg-red-500 text-white text-sm"
                            type="button"
                        >
                            Clear Cart
                        </button>
                        <button
                            className="flex-1 py-2 rounded bg-green-600 text-white 
text-sm"
                            type="button"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
CartDropdown.propTypes = {
    className: PropTypes.string,
};
