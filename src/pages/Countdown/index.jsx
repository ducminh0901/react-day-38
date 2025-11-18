// /src/pages/CountDown/index.jsx
import { useEffect, useRef, useState } from "react";

const START_COUNT = 10;

export default function CountDown() {
    const [count, setCount] = useState(START_COUNT);

    const intervalRef = useRef(null);

    const startTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        intervalRef.current = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        startTimer();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    const handleReset = () => {
        setCount(START_COUNT);

        startTimer();
    };

    return (
        <div className="p-6 max-w-md mx-auto text-center">
            <h1 className="text-xl font-semibold mb-4">Count is {count}</h1>

            <div className="flex justify-center gap-3">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Reset
                </button>

                <button
                    onClick={() => {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                >
                    Stop
                </button>
            </div>
        </div>
    );
}
