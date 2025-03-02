import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppContext} from '../context/AppContext';
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Position,
    addEdge,
    MiniMap,
    NodeTypes,
    ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {GitBranch, Move} from 'lucide-react';
import TeamNode from "../components/Diagram/TeamNode.tsx";
import UserNode from "../components/Diagram/UserNode.tsx";


const nodeTypes: NodeTypes = {
    teamNode: TeamNode,
    userNode: UserNode
};

const DiagramPage: React.FC = () => {
    const [layoutType, setLayoutType] = useState<'horizontal' | 'vertical'>('horizontal');

    const {teams, users} = useAppContext();


    const {initialNodes, initialEdges} = useMemo(() => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        if (layoutType === 'horizontal') {
            teams.forEach((team, index) => {
                const teamUsers = users.filter(user => user.teamId === team.id);

                nodes.push({
                    id: `team-${team.id}`,
                    type: 'teamNode',
                    data: {
                        label: team.name,
                        description: team.description,
                        color: team.color || '#3b82f6',
                        users: teamUsers
                    },
                    position: {x: 100, y: index * 300 + 50},
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left
                });

                teamUsers.forEach((user, userIndex) => {
                    const rowsPerTeam = Math.min(teamUsers.length, 3);
                    const col = Math.floor(userIndex / rowsPerTeam);
                    const row = userIndex % rowsPerTeam;

                    nodes.push({
                        id: `user-${user.id}`,
                        type: 'userNode',
                        data: {
                            label: user.name,
                            role: user.role,
                            teamColor: team.color || '#3b82f6',
                            avatar: user.avatar
                        },
                        position: {
                            x: 450 + (col * 220),
                            y: (index * 300) + (row * 100) + 50
                        },
                        targetPosition: Position.Left,
                        sourcePosition: Position.Right
                    });

                    edges.push({
                        id: `edge-${team.id}-${user.id}`,
                        source: `team-${team.id}`,
                        target: `user-${user.id}`,
                        animated: false,
                        style: {stroke: team.color || '#3b82f6', strokeWidth: 2},
                        type: 'smoothstep'
                    });
                });
            });
        } else {
            teams.forEach((team, index) => {
                const teamUsers = users.filter(user => user.teamId === team.id);
                const teamSpacing = 600;

                nodes.push({
                    id: `team-${team.id}`,
                    type: 'teamNode',
                    data: {
                        label: team.name,
                        description: team.description,
                        color: team.color || '#3b82f6',
                        users: teamUsers
                    },
                    position: {x: index * teamSpacing + 100, y: 100},
                    sourcePosition: Position.Bottom,
                    targetPosition: Position.Top
                });

                teamUsers.forEach((user, userIndex) => {
                    const usersPerRow = 3;
                    const col = userIndex % usersPerRow;
                    const row = Math.floor(userIndex / usersPerRow);

                    nodes.push({
                        id: `user-${user.id}`,
                        type: 'userNode',
                        data: {
                            label: user.name,
                            role: user.role,
                            teamColor: team.color || '#3b82f6',
                            avatar: user.avatar
                        },
                        position: {
                            x: (index * teamSpacing) + (col * 200) - 100,
                            y: 250 + (row * 100)
                        },
                        targetPosition: Position.Top,
                        sourcePosition: Position.Bottom
                    });

                    edges.push({
                        id: `edge-${team.id}-${user.id}`,
                        source: `team-${team.id}`,
                        target: `user-${user.id}`,
                        animated: false,
                        style: {stroke: team.color || '#3b82f6', strokeWidth: 2},
                        type: 'smoothstep'
                    });
                });
            });
        }

        return {initialNodes: nodes, initialEdges: edges};
    }, [teams, users, layoutType]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialNodes, initialEdges]);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge({...params, type: 'smoothstep'}, eds)),
        [setEdges]
    );

    const handleToggleLayout = () => {
        setLayoutType(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                    <GitBranch className="mr-3" size={28}/>
                    Team Structure Diagram
                </h1>
                <p className="text-gray-600">Interactive visualization of teams and their members</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                        <button
                            onClick={handleToggleLayout}
                            className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                            <Move className="mr-2" size={16}/>
                            {layoutType === 'horizontal' ? 'Switch to Vertical' : 'Switch to Horizontal'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-0 rounded-lg shadow-md overflow-hidden" style={{height: '75vh'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    minZoom={0.2}
                    maxZoom={2}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                    attributionPosition="bottom-right"
                >
                    <Controls showInteractive={false}/>
                    <Background color="#f8f8f8" gap={16} size={1}/>
                    <MiniMap
                        nodeStrokeWidth={3}
                        zoomable
                        pannable
                        nodeColor={(node) => {
                            if (node.type === 'teamNode') {
                                return node.data.color;
                            }
                            return '#f1f5f9';
                        }}
                    />
                </ReactFlow>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Team Legend</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {teams.map(team => {
                        const teamUsers = users.filter(user => user.teamId === team.id);
                        return (
                            <div
                                key={team.id}
                                className="flex items-center p-3 rounded-md"
                                style={{backgroundColor: `${team.color}20`}}
                            >
                                <div
                                    className="w-4 h-4 rounded-full mr-2"
                                    style={{backgroundColor: team.color}}
                                ></div>
                                <div>
                                    <div className="font-medium text-sm">{team.name}</div>
                                    <div className="text-xs text-gray-600">{teamUsers.length} members</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DiagramPage;