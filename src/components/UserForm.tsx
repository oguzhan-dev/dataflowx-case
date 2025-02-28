import React, {useState} from 'react';
import {useAppContext} from '../context/AppContext';
import {UserPlus} from 'lucide-react';

const UserForm: React.FC = () => {
    const {teams, addUser} = useAppContext();
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [teamId, setTeamId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() === '' || teamId === '') return;

        const newUser = {
            id: Date.now().toString(),
            name,
            role,
            teamId
        };

        addUser(newUser);
        setName('');
        setRole('');
        setTeamId('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <UserPlus className="mr-2"/>
                Add New User
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                        User Name
                    </label>
                    <input
                        type="text"
                        id="userName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter user name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </label>
                    <input
                        type="text"
                        id="userRole"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter user role"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="teamSelect" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Team
                    </label>
                    <select
                        id="teamSelect"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default UserForm;