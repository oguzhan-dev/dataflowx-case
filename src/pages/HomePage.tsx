import React from 'react';
import TeamForm from "../components/TeamForm.tsx";
import UserForm from "../components/UserForm.tsx";

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Team Management Dashboard</h1>
                <p className="text-gray-600">Create and manage your teams and team members</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <TeamForm/>
                <UserForm/>
            </div>
        </div>
    );
};

export default HomePage;