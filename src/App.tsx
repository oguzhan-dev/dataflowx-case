import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <main className="pb-12">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;