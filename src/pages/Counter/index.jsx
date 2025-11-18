import { useState, useCallback } from "react";
import CounterA from "../../components/CounterA";
import CounterB from "../../components/CounterB";

function Counter() {
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    const increaseA = useCallback(() => {
        setCountA((prev) => prev + 1);
    }, []);

    const increaseB = useCallback(() => {
        setCountB((prev) => prev + 1);
    }, []);

    console.log("Parent Counter render");

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">Counter Parent</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CounterA value={countA} onIncrease={increaseA} />
                <CounterB value={countB} onIncrease={increaseB} />
            </div>
        </div>
    );
}

export default Counter;
