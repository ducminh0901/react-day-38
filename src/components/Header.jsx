import { useState, useRef, useEffect } from "react";
import IconCart from "./IconCard";
import useCart from "../hooks/useCart";
import CartDropdown from "./CartDropdown";
export default function Header() {
    const { totalQuantity } = useCart();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        function onDoc(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("click", onDoc);
        return () => document.removeEventListener("click", onDoc);
    }, []);
    return (
        <header className="w-full p-4 border bg-white">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="text-xl font-bold">My Shop</div>
                <div className="relative" ref={ref}>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                        type="button"
                        title="Cart"
                    >
                        <IconCart />
                        {totalQuantity > 0 && (
                            <span
                                className="ml-1 inline-flex items-center justify-center 
px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white"
                            >
                                {totalQuantity}
                            </span>
                        )}
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-2 z-50">
                            <CartDropdown />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
