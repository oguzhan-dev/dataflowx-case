export interface User {
    id: string;
    name: string;
    role: string;
    teamId: string;
    email?: string;
    joinDate?: string;
    avatar?: string;
}

export interface Team {
    id: string;
    name: string;
    description: string;
    color?: string;
}

export interface TeamStats {
    totalMembers: number;
    teamDistribution: {
        name: string;
        members: number;
        color: string;
    }[];
    roleDistribution: {
        name: string;
        value: number;
    }[];
}