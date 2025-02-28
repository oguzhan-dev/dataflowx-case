import React, {useEffect, useCallback} from "react";
import ReactFlow, {
    Handle,
    Position,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Connection,
    Edge,
    Node,
} from "reactflow";
import "reactflow/dist/style.css";
import {useAppContext} from "../context/AppContext";

interface TeamNodeProps {
    data: {
        label: string;
        color?: string;
    };
}

const TeamNode: React.FC<TeamNodeProps> = ({data}) => {
    return (
        <div
            className="p-4 bg-white rounded-lg shadow-lg border-l-8 flex items-center justify-center"
            style={{borderLeftColor: data.color || "#3b82f6", width: 220, height: 80}}
        >
            <div className="font-bold text-lg text-center" style={{color: data.color || "#3b82f6"}}>
                {data.label}
            </div>
        </div>
    );
};

interface UserNodeProps {
    data: {
        label: string;
        role: string;
        color?: string;
    };
}

const UserNode: React.FC<UserNodeProps> = ({data}) => {
    return (
        <div
            className="p-3 bg-gray-100 rounded-md shadow-md border-l-4 text-sm flex flex-col items-center justify-center"
            style={{borderLeftColor: data.color || "#3b82f6", width: 220, height: 70}}
        >
            <div className="font-medium text-center">{data.label}</div>
            <div className="text-gray-600 text-xs">{data.role}</div>
            <Handle type="target" position={Position.Top} className="bg-gray-500 w-2 h-2"/>
        </div>
    );
};

const nodeTypes = {
    team: TeamNode,
    user: UserNode,
};

const DiagramPage: React.FC = () => {
    const {teams, users} = useAppContext();

    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

    const generateElements = useCallback(() => {
        let nodes: Node[] = [];
        let edges: Edge[] = [];

        const spacingX = 400;
        const spacingY = 120; // Kullanıcı düğümlerinin alt alta sıralanmasını sağlamak için

        teams.forEach((team, index) => {
            const teamX = index * spacingX;
            nodes.push({
                id: `team-${team.id}`,
                type: "team",
                position: {x: teamX, y: 50}, // Takım düğümleri üstte
                data: {label: team.name, color: team.color},
            });

            const teamUsers = users.filter((user) => user.teamId === team.id);

            teamUsers.forEach((user, userIndex) => {
                const userId = `user-${user.id}`;
                const userX = teamX; // Kullanıcılar takımın hizasında olacak
                const userY = 150 + userIndex * spacingY; // Kullanıcılar alt alta dizilecek

                nodes.push({
                    id: userId,
                    type: "user",
                    position: {x: userX, y: userY},
                    data: {label: user.name, role: user.role, color: team.color},
                });

                edges.push({
                    id: `edge-${team.id}-${user.id}`,
                    source: `team-${team.id}`,
                    target: userId,
                    type: "smoothstep",
                    animated: true,
                    style: {stroke: team.color || "#3b82f6", strokeWidth: 2},
                });
            });
        });

        setNodes(nodes);
        setEdges(edges);
    }, [teams, users, setNodes, setEdges]);

    useEffect(() => {
        generateElements();
    }, [teams, users, generateElements]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => [...eds, params as Edge]),
        [setEdges]
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Structure Diagram</h1>
                <p className="text-gray-600">Visual representation of teams and their members</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md relative" style={{height: "80vh"}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-gray-50 rounded-lg"
                >
                    <Background gap={12} size={1} className="opacity-30"/>
                    <MiniMap nodeColor={(node) => node.data.color || "#3b82f6"} className="rounded-md"/>
                    <Controls/>
                </ReactFlow>
            </div>
        </div>
    );
};

export default DiagramPage;
