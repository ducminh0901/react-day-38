import React from "react";
import PropTypes from "prop-types";

function CounterB({ value, onIncrease }) {
    console.log("CounterB re-render");

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold">Count B is {value}</h2>
            <button
                onClick={onIncrease}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
            >
                Increase Count B
            </button>
        </div>
    );
}

CounterB.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
};

export default React.memo(CounterB);
