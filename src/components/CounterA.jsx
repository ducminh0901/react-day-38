import React from "react";
import PropTypes from "prop-types";

function CounterA({ value, onIncrease }) {
    console.log("CounterA re-render");

    return (
        <div className="p-4 border rounded">
            <h2 className="text-lg font-semibold">Count A is {value}</h2>
            <button
                onClick={onIncrease}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
            >
                Increase Count A
            </button>
        </div>
    );
}

CounterA.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
};

export default React.memo(CounterA);
