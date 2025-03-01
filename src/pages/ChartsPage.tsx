import React from 'react';
import {useAppContext} from '../context/AppContext';
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    LabelList
} from 'recharts';
import {BarChart2, PieChart as PieChartIcon} from 'lucide-react';

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

const renderCustomizedPieLabel = (props: any) => {
    const {cx, cy, midAngle, innerRadius, outerRadius, percent, name} = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
        <text
            x={x}
            y={y}
            fill="#333"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            className="text-xs font-medium"
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const ChartsPage: React.FC = () => {
    const {teams, users} = useAppContext();

    const teamDistribution = teams.map(team => {
        const teamUsers = users.filter(user => user.teamId === team.id);
        return {
            name: team.name,
            value: teamUsers.length,
            color: team.color || '#3b82f6',
            percent: teamUsers.length / users.length
        };
    });

    const roleMap: Record<string, number> = {};
    users.forEach(user => {
        if (user.role) {
            roleMap[user.role] = (roleMap[user.role] || 0) + 1;
        }
    });

    const roleDistribution = Object.entries(roleMap)
        .map(([name, value]) => ({name, value}))
        .sort((a, b) => b.value - a.value); // Sort by count descending

    // Generate colors for role chart
    const ROLE_COLORS = [
        '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
        '#d0ed57', '#ffc658', '#ff8042', '#ff6361', '#bc5090'
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Analytics</h1>
                <p className="text-gray-600">Visual analytics of team composition and distribution</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <PieChartIcon className="mr-2" size={20}/>
                        Team Distribution
                    </h2>
                    <div className="h-[400px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={teamDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedPieLabel}
                                    outerRadius={130}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {teamDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color}/>
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip/>}/>
                                <Legend
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                        <div className="grid grid-cols-3 gap-2">
                            {teamDistribution.map((team, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{backgroundColor: team.color}}
                                    ></div>
                                    <span className="text-xs truncate">{team.name}: {team.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <BarChart2 className="mr-2" size={20}/>
                        Role Distribution
                    </h2>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={roleDistribution}
                                layout="vertical"
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 100,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                                <XAxis type="number"/>
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={100}
                                    tick={{fontSize: 12}}
                                />
                                <Tooltip content={<CustomBarTooltip/>}/>
                                <Bar dataKey="value" name="Members">
                                    {roleDistribution.map((entry, index) => (
                                        <Cell
                                            key={`cell-${entry}`}
                                            fill={ROLE_COLORS[index % ROLE_COLORS.length]}
                                        />
                                    ))}
                                    <LabelList dataKey="value" position="right"/>
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Summary</h3>
                        <ul className="text-xs text-gray-600 space-y-1">
                            <li>• Total roles: {roleDistribution.length}</li>
                            <li>• Most common: {roleDistribution[0]?.name} ({roleDistribution[0]?.value} members)</li>
                            {roleDistribution.length > 1 && (
                                <li>• Least
                                    common: {roleDistribution[roleDistribution.length - 1]?.name} ({roleDistribution[roleDistribution.length - 1]?.value} members)</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Team Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {teams.map(team => {
                        const teamUsers = users.filter(user => user.teamId === team.id);
                        const teamRoles = [...new Set(teamUsers.map(user => user.role))];

                        return (
                            <div
                                key={team.id}
                                className="border rounded-lg p-4"
                                style={{borderLeftColor: team.color, borderLeftWidth: '4px'}}
                            >
                                <h3 className="font-medium">{team.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{team.description}</p>
                                <div className="flex justify-between text-sm">
                                    <span>{teamUsers.length} members</span>
                                    <span>{teamRoles.length} roles</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChartsPage;