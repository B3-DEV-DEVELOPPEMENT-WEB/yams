// Result.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/result.css';

const Result = () => {
    const location = useLocation();
    const diceValues = location.state?.diceValues || [];
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>Résultat</h2>
            <div className="result">
                {diceValues.map((value, index) => (
                    <span key={index}>{value}</span>
                ))}
            </div>
            <button onClick={goToHome}>Rejouer</button>
        </div>
    );
};

export default Result;
