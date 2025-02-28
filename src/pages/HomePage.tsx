import React from 'react';
import TeamForm from "../components/TeamForm.tsx";
import UserForm from "../components/UserForm.tsx";
import TeamList from "../components/TeamList.tsx";
import UserList from "../components/UserList.tsx";
import {Briefcase, UserPlus, Users} from "lucide-react";
import {useAppContext} from "../context/AppContext.tsx";

const HomePage: React.FC = () => {
    const {teams, users} = useAppContext();

    // Calculate stats directly in the component
    const totalMembers = users.length;
    const totalTeams = teams.length;

    // Calculate unique roles
    const roles = users.map(user => user.role);
    const uniqueRoles = [...new Set(roles)];
    const totalRoles = uniqueRoles.length;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Management Dashboard</h1>
                <p className="text-gray-600">Create and manage your teams and team members</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-blue-700 p-3 rounded-full mr-4">
                        <Users className="h-8 w-8"/>
                    </div>
                    <div>
                        <p className="text-blue-100 text-sm">Total Members</p>
                        <h3 className="text-3xl font-bold">{totalMembers}</h3>
                    </div>
                </div>

                <div className="bg-green-600 text-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-green-700 p-3 rounded-full mr-4">
                        <Briefcase className="h-8 w-8"/>
                    </div>
                    <div>
                        <p className="text-green-100 text-sm">Total Teams</p>
                        <h3 className="text-3xl font-bold">{totalTeams}</h3>
                    </div>
                </div>

                <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-purple-700 p-3 rounded-full mr-4">
                        <UserPlus className="h-8 w-8"/>
                    </div>
                    <div>
                        <p className="text-purple-100 text-sm">Roles</p>
                        <h3 className="text-3xl font-bold">{totalRoles}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <TeamForm/>
                <UserForm/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TeamList/>
                <UserList/>
            </div>
        </div>
    );
};

export default HomePage;