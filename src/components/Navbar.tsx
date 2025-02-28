import React from 'react';
import {Link} from 'react-router-dom';
import {Users, BarChart2, GitBranch, Home} from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold flex items-center">
                    <Users className="mr-2"/>
                    Team Management
                </Link>
                <div className="flex space-x-4">
                    <Link to="/" className="flex items-center hover:text-blue-200">
                        <Home className="mr-1" size={18}/>
                        Home
                    </Link>
                    <Link to="/diagram" className="flex items-center hover:text-blue-200">
                        <GitBranch className="mr-1" size={18}/>
                        Diagram
                    </Link>
                    <Link to="/charts" className="flex items-center hover:text-blue-200">
                        <BarChart2 className="mr-1" size={18}/>
                        Charts
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;