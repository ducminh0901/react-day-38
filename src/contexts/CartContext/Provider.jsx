import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import CartContext from "./Context";
import reducer, { ACTIONS } from "./reducer";
const LOCAL_KEY = "cart";
const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
};
function init() {
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (!raw) return initialState;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.items)) return initialState;
        return {
            items: parsed.items,
            totalPrice: parsed.totalPrice || 0,
            totalQuantity: parsed.totalQuantity || 0,
        };
    } catch (e) {
        console.warn("Failed to parse cart from localStorage", e);
        return initialState;
    }
}
export default function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, undefined, init);
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn("Failed to save cart to localStorage", e);
        }
    }, [state]);
    const addToCart = (product) =>
        dispatch({ type: ACTIONS.ADD, payload: product });
    const removeFromCart = (id) =>
        dispatch({ type: ACTIONS.REMOVE, payload: id });
    const updateQuantity = (id, quantity) =>
        dispatch({ type: ACTIONS.UPDATE_QTY, payload: { id, quantity } });
    const clearCart = () => dispatch({ type: ACTIONS.CLEAR });
    const value = {
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
