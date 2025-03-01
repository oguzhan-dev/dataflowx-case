import React, {useCallback, useMemo, useState} from 'react';
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
    Panel,
    MiniMap,
    NodeTypes,
    ConnectionLineType
} from 'reactflow';
import 'reactflow/dist/style.css';
import {GitBranch, Users, ZoomIn, ZoomOut, Move, Maximize2} from 'lucide-react';

// Custom node components
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

// Node types definition
const nodeTypes: NodeTypes = {
    teamNode: TeamNode,
    userNode: UserNode
};

const DiagramPage: React.FC = () => {
    const {teams, users} = useAppContext();
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [layoutType, setLayoutType] = useState<'horizontal' | 'vertical'>('horizontal');

    // Create nodes and edges based on layout type
    const {initialNodes, initialEdges} = useMemo(() => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        if (layoutType === 'horizontal') {
            // Horizontal layout (teams on left, users on right)
            teams.forEach((team, index) => {
                const teamUsers = users.filter(user => user.teamId === team.id);

                // Add team node
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

                // Add user nodes for this team
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

                    // Add edge from team to user
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
            // Vertical layout (teams on top, users below)
            teams.forEach((team, index) => {
                const teamUsers = users.filter(user => user.teamId === team.id);
                const teamSpacing = 300;

                // Add team node
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

                // Add user nodes for this team
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

                    // Add edge from team to user
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

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge({...params, type: 'smoothstep'}, eds)),
        [setEdges]
    );

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.2, 2));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
    };

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

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            title="Zoom out"
                        >
                            <ZoomOut size={18}/>
                        </button>
                        <span className="text-sm text-gray-600">{Math.round(zoomLevel * 100)}%</span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            title="Zoom in"
                        >
                            <ZoomIn size={18}/>
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
                    <Panel position="top-right">
                        <button
                            onClick={() => {
                                setNodes(initialNodes);
                                setEdges(initialEdges);
                            }}
                            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                            title="Reset view"
                        >
                            <Maximize2 size={16} className="mr-2"/>
                            Reset View
                        </button>
                    </Panel>
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