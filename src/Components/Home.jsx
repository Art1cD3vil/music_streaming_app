// Home.jsx
import React from 'react';

const Home = () => {
    const handlePurchasePremium = () => {
        // Logic to handle premium purchase
        alert('Premium feature purchased! You can now download songs.');
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Music Streaming Service</h1>
            <p>Explore our vast library of songs</p>
            <div className="premium-feature">
            
                <button onClick={handlePurchasePremium}>Buy Premium</button>
            </div>
        </div>
    );
};

export default Home;
