import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Users, BarChart2, GitBranch, Home, Menu} from "lucide-react";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-800 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold flex items-center">
                    <Users className="mr-2" size={24}/>
                    Team Management
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="flex items-center hover:text-blue-300 transition-all">
                        <Home className="mr-1" size={18}/> Home
                    </Link>
                    <Link to="/diagram" className="flex items-center hover:text-blue-300 transition-all">
                        <GitBranch className="mr-1" size={18}/> Diagram
                    </Link>
                    <Link to="/charts" className="flex items-center hover:text-blue-300 transition-all">
                        <BarChart2 className="mr-1" size={18}/> Charts
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden focus:outline-none"
                >
                    <Menu size={28}/>
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden flex flex-col bg-blue-700 p-3 mt-2 rounded-lg">
                    <Link to="/" className="flex items-center py-2 hover:text-blue-300 transition-all">
                        <Home className="mr-2" size={18}/> Home
                    </Link>
                    <Link to="/diagram" className="flex items-center py-2 hover:text-blue-300 transition-all">
                        <GitBranch className="mr-2" size={18}/> Diagram
                    </Link>
                    <Link to="/charts" className="flex items-center py-2 hover:text-blue-300 transition-all">
                        <BarChart2 className="mr-2" size={18}/> Charts
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
