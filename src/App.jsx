import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CountDown from "./pages/Countdown";
import Counter from "./pages/Counter";
import ShoppingCartPageWrapper from "./pages/ShoppingCart";

function App() {
    return (
        <Router>
            <div style={{ padding: 20 }}>
                <h2>Bài tập React Day 38</h2>

                <ul style={{ display: "flex", gap: 20 }}>
                    <li>
                        <Link to="/">Countdown</Link>
                    </li>
                    <li>
                        <Link to="/counter">Counter</Link>
                    </li>
                    <li>
                        <Link to="/shopping">Context API</Link>
                    </li>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<CountDown />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/shopping" element={<ShoppingCartPageWrapper />} />
            </Routes>
        </Router>
    );
}

export default App;
