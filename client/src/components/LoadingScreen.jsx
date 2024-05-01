import React, { useState, useEffect } from 'react';
import '../css/LoadingScreen.css';

const LoadingScreen = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="loading-screen">
            <div className="loading-message">
                Updating{dots}
            </div>
        </div>
    );
};

export default LoadingScreen;
