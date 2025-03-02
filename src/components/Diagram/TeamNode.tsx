import {Users} from "lucide-react";

const TeamNode = ({data}: { data: any }) => {
    const teamUsers = data.users || [];

    return (
        <div className="shadow-lg rounded-lg overflow-hidden" style={{minWidth: '220px'}}>
            <div
                className="p-3 text-white"
                style={{backgroundColor: data.color}}
            >
                <div className="font-bold text-lg flex items-center">
                    <Users className="mr-2" size={18}/>
                    {data.label}
                </div>
                <div className="text-xs opacity-90">{data.description}</div>
                <div className="text-xs mt-1">{teamUsers.length} members</div>
            </div>
        </div>
    );
};

export default TeamNode;
