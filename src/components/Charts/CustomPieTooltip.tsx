import React from "react";

const CustomPieTooltip = ({active, payload}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
                <p className="font-medium">{payload[0].name}</p>
                <p className="text-sm">
                    <span className="font-medium">{payload[0].value}</span> members
                </p>
                <p className="text-sm text-gray-500">
                    {(payload[0].payload.percent * 100).toFixed(0)}% of total
                </p>
            </div>
        );
    }
    return null;
};

export default CustomPieTooltip;
