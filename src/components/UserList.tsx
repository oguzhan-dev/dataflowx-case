import React from 'react';
import {useAppContext} from '../context/AppContext';
import {Trash2} from 'lucide-react';

const UserList: React.FC = () => {
    const {users, teams, removeUser} = useAppContext();

    const getTeamName = (teamId: string) => {
        const team = teams.find(team => team.id === teamId);
        return team ? team.name : 'Unknown Team';
    };

    const getTeamColor = (teamId: string) => {
        const team = teams.find(team => team.id === teamId);
        return team?.color || '#3b82f6';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Team Members</h2>

            {users.length === 0 ? (
                <p className="text-gray-500">No team members added yet.</p>
            ) : (
                <div className="space-y-4">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow flex items-center"
                        >
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                />
                            ) : (
                                <div
                                    className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white font-medium"
                                    style={{backgroundColor: getTeamColor(user.teamId)}}
                                >
                                    {user.name.charAt(0)}
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800">{user.name}</h3>
                                <p className="text-gray-600 text-sm">{user.role}</p>
                                <div className="mt-1 flex items-center">
                  <span
                      className="inline-block w-2 h-2 rounded-full mr-2"
                      style={{backgroundColor: getTeamColor(user.teamId)}}
                  ></span>
                                    <span className="text-xs text-gray-500">
                    {getTeamName(user.teamId)}
                  </span>

                                    {user.joinDate && (
                                        <span className="text-xs text-gray-400 ml-2">
                      Joined: {user.joinDate}
                    </span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => removeUser(user.id)}
                                className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                                title="Remove user"
                            >
                                <Trash2 className="h-5 w-5"/>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;