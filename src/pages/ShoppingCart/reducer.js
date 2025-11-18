export const ACTIONS = {
    ADD: "ADD_TO_CART",
    REMOVE: "REMOVE_FROM_CART",
    UPDATE_QTY: "UPDATE_QUANTITY",
    CLEAR: "CLEAR_CART",
};

function calcTotals(items) {
    const totalQuantity = items.reduce((s, it) => s + (it.quantity || 0), 0);
    const totalPrice = items.reduce(
        (s, it) => s + (it.quantity || 0) * (it.price || 0),
        0
    );

    return { totalPrice, totalQuantity };
}

export default function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD: {
            const product = action.payload;
            const existing = state.items.find((i) => i.id === product.id);
            let items;
            if (existing) {
                items = state.items.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                items = [...state.items, { ...product, quantity: 1 }];
            }
            const totals = calcTotals(items);
            return { ...state, items, ...totals };
        }
        case ACTIONS.REMOVE: {
            const id = action.payload;
            const items = state.items.filter((i) => i.id !== id);
            const totals = calcTotals(items);
            return { ...state, items, ...totals };
        }
        case ACTIONS.UPDATE_QTY: {
            const { id, quantity } = action.payload;
            let items = state.items.map((i) =>
                i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
            );
            items = items.filter((i) => i.quantity > 0);
            const totals = calcTotals(items);
            return { ...state, items, ...totals };
        }
        case ACTIONS.CLEAR: {
            return { items: [], totalPrice: 0, totalQuantity: 0 };
        }
        default:
            return state;
    }
}
