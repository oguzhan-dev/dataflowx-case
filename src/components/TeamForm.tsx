import React, {useState} from 'react';
import {useAppContext} from '../context/AppContext';
import {Users} from 'lucide-react';

const TeamForm: React.FC = () => {
    const {addTeam} = useAppContext();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() === '') return;

        const newTeam = {
            id: Date.now().toString(),
            name,
            description
        };

        addTeam(newTeam);
        setName('');
        setDescription('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="mr-2"/>
                Create New Team
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
                        Team Name
                    </label>
                    <input
                        type="text"
                        id="teamName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter team name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="teamDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter team description"
                        rows={3}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Create Team
                </button>
            </form>
        </div>
    );
};

export default TeamForm;