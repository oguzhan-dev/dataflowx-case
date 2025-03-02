const UserNode = ({data}: { data: any }) => {
    return (
        <div
            className="shadow-md rounded-lg overflow-hidden bg-white border"
            style={{
                borderLeftColor: data.teamColor,
                borderLeftWidth: '4px',
                minWidth: '180px'
            }}
        >
            <div className="p-3">
                <div className="flex items-center">
                    {data.avatar ? (
                        <img
                            src={data.avatar}
                            alt={data.label}
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                    ) : (
                        <div
                            className="w-8 h-8 rounded-full mr-2 flex items-center justify-center text-white text-xs font-medium"
                            style={{backgroundColor: data.teamColor}}
                        >
                            {data.label.charAt(0)}
                        </div>
                    )}
                    <div>
                        <div className="font-medium text-sm">{data.label}</div>
                        <div className="text-xs text-gray-600">{data.role}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserNode;