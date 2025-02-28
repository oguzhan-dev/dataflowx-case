import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {Team, User, TeamStats} from '../types';
import {defaultTeams, defaultUsers} from "../types/dummy.ts";

interface AppContextType {
    teams: Team[];
    users: User[];
    stats: TeamStats;
    addTeam: (team: Team) => void;
    addUser: (user: User) => void;
    removeTeam: (id: string) => void;
    removeUser: (id: string) => void;
    updateTeam: (id: string, team: Partial<Team>) => void;
    updateUser: (id: string, user: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [teams, setTeams] = useState<Team[]>(defaultTeams);
    const [users, setUsers] = useState<User[]>(defaultUsers);
    const [stats, setStats] = useState<TeamStats>({totalMembers: 0, teamDistribution: [], roleDistribution: []});

    useEffect(() => {
        const totalMembers = users.length;

        const teamDistribution = teams.map(team => ({
            name: team.name,
            members: users.filter(user => user.teamId === team.id).length,
            color: team.color || '#ccc'
        }));

        const roleDistribution: { name: string; value: number }[] = [];
        users.forEach(user => {
            const role = roleDistribution.find(r => r.name === user.role);
            if (role) {
                role.value += 1;
            } else {
                roleDistribution.push({name: user.role, value: 1});
            }
        });

        setStats({totalMembers, teamDistribution, roleDistribution});
    }, [teams, users]);

    const addTeam = (team: Team) => {
        setTeams(prev => [...prev, team]);
    };

    const addUser = (user: User) => {
        setUsers(prev => [...prev, user]);
    };

    const removeTeam = (id: string) => {
        setTeams(prev => prev.filter(team => team.id !== id));
        setUsers(prev => prev.filter(user => user.teamId !== id));
    };

    const removeUser = (id: string) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    const updateTeam = (id: string, team: Partial<Team>) => {
        setTeams(prev => prev.map(t => (t.id === id ? {...t, ...team} : t)));
    };

    const updateUser = (id: string, user: Partial<User>) => {
        setUsers(prev => prev.map(u => (u.id === id ? {...u, ...user} : u)));
    };

    return (
        <AppContext.Provider
            value={{teams, users, stats, addTeam, addUser, removeTeam, removeUser, updateTeam, updateUser}}>
            {children}
        </AppContext.Provider>
    );
};
