const TEAM_COLORS = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
];

export const defaultTeams = [
    {id: '1', name: 'Development', description: 'Software development team', color: TEAM_COLORS[0]},
    {id: '2', name: 'Design', description: 'UI/UX design team', color: TEAM_COLORS[1]},
    {id: '3', name: 'Marketing', description: 'Marketing and sales team', color: TEAM_COLORS[2]}
];

export const defaultUsers = [
    {
        id: '1',
        name: 'John Doe',
        role: 'Frontend Developer',
        teamId: '1',
        email: 'john.doe@example.com',
        joinDate: '2023-01-15',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: '2',
        name: 'Jane Smith',
        role: 'Backend Developer',
        teamId: '1',
        email: 'jane.smith@example.com',
        joinDate: '2023-02-20',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        role: 'UI Designer',
        teamId: '2',
        email: 'mike.johnson@example.com',
        joinDate: '2023-03-10',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: '4',
        name: 'Sarah Williams',
        role: 'Marketing Specialist',
        teamId: '3',
        email: 'sarah.williams@example.com',
        joinDate: '2023-04-05',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: '5',
        name: 'David Lee',
        role: 'Full Stack Developer',
        teamId: '1',
        email: 'david.lee@example.com',
        joinDate: '2023-05-12',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
        id: '6',
        name: 'Emily Chen',
        role: 'UX Designer',
        teamId: '2',
        email: 'emily.chen@example.com',
        joinDate: '2023-06-18',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
]