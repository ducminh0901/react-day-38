import PropTypes from "prop-types";
function formatPrice(v) {
    try {
        return new Intl.NumberFormat("vi-VN").format(v) + "đ";
    } catch (e) {
        return v + "đ";
    }
}
export default function ProductCard({ product, onAdd }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm flex flex-col">
            <div
                className="h-40 bg-gray-100 rounded-md mb-3 flex items-center 
justify-center"
            >
                {product.thumbnail ? (
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="max-h-36"
                    />
                ) : (
                    <div className="text-gray-500">No image</div>
                )}
            </div>
            <h3 className="text-sm font-semibold mb-1 truncate">
                {product.title}
            </h3>
            <div className="text-sm mb-3">{formatPrice(product.price)}</div>
            <div className="mt-auto">
                <button
                    onClick={() => onAdd(product)}
                    className="w-full py-2 rounded-md bg-blue-600 text-white font
medium hover:opacity-90"
                    type="button"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string,
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
};
