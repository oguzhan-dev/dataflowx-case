import React from 'react';
import {useAppContext} from '../context/AppContext';
import {Trash2} from 'lucide-react';

const TeamList: React.FC = () => {
    const {teams, removeTeam, users} = useAppContext();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Teams</h2>
            {teams.length === 0 ? (
                <p className="text-gray-500">No teams available.</p>
            ) : (
                <div className="space-y-4">
                    {teams.map((team) => {
                        const teamUsers = users.filter(user => user.teamId === team.id);
                        return (
                            <div key={team.id} className="border border-gray-200 rounded-md p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-lg">{team.name}</h3>
                                        <p className="text-gray-600 text-sm">{team.description}</p>
                                        <p className="text-sm text-blue-600 mt-1">
                                            {teamUsers.length} {teamUsers.length === 1 ? 'member' : 'members'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeTeam(team.id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Remove team"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                                {teamUsers.length > 0 && (
                                    <div className="mt-3">
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">Team Members:</h4>
                                        <ul className="text-sm text-gray-600 pl-4">
                                            {teamUsers.map(user => (
                                                <li key={user.id}>{user.name} - {user.role}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TeamList;