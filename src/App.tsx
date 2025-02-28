import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import {AppProvider} from "./context/AppContext.tsx";
import DiagramPage from "./pages/DiagramPage.tsx";
import ChartsPage from "./pages/ChartsPage.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
    return (
        <AppProvider>
            <Router>
                <div className="min-h-screen bg-gray-100">
                    <Navbar/>
                    <main className="pb-12">
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/diagram" element={<DiagramPage/>}/>
                            <Route path="/charts" element={<ChartsPage/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;