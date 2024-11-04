import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login'; // Adjust the path if necessary
import SignUp from './Components/SignUp'; // Adjust the path if necessary
import Home from './Components/Home'; // Adjust the path if necessary

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect from the root path to the Sign Up page */}
                <Route path="/" element={<Navigate to="/signup" replace />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
