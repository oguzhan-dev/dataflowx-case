const CustomBarTooltip = ({active, payload, label}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
                <p className="font-medium">{label}</p>
                <p className="text-sm">
                    <span className="font-medium">{payload[0].value}</span> members
                </p>
            </div>
        );
    }
    return null;
};

export default CustomBarTooltip;