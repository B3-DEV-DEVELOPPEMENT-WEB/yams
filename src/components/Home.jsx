// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
    const navigate = useNavigate();
    const [diceValues, setDiceValues] = useState([]);
    const [showResultButton, setShowResultButton] = useState(false);
    const [rollsCount, setRollsCount] = useState(0);
    const [selectedDiceIndexes, setSelectedDiceIndexes] = useState([]);
    const [keptDiceValues, setKeptDiceValues] = useState([]);
    const [rollingDiceIndexes, setRollingDiceIndexes] = useState([]);

    const rollDice = () => {
        const newDiceValues = keptDiceValues.length > 0
            ? keptDiceValues.map(() => Math.floor(Math.random() * 6) + 1)
            : Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);

        setDiceValues(newDiceValues);
        setShowResultButton(true);
        setRollsCount(rollsCount + 1);
        setDiceValues([...newDiceValues, ...keptDiceValues]);
        setKeptDiceValues([]);
        setRollingDiceIndexes(Array.from({ length: newDiceValues.length }, (_, index) => index));
    };

    const relaunchDice = () => {
        const newDiceValues = [...diceValues];

        selectedDiceIndexes.forEach(index => {
            newDiceValues[index] = Math.floor(Math.random() * 6) + 1;
        });

        setSelectedDiceIndexes([]);
        setKeptDiceValues(newDiceValues.filter((value, index) => !selectedDiceIndexes.includes(index)));

        setDiceValues(newDiceValues);
        setShowResultButton(true);
        setRollsCount(rollsCount + 1);
        setRollingDiceIndexes(selectedDiceIndexes);
    };

    const handleDiceClick = (index) => {
        if (selectedDiceIndexes.includes(index)) {
            setSelectedDiceIndexes(selectedDiceIndexes.filter(selectedIndex => selectedIndex !== index));
        } else {
            setSelectedDiceIndexes([...selectedDiceIndexes, index]);
        }
    };

    const navigateToResult = () => {
        navigate('/result', { state: { diceValues } });
    };

    useEffect(() => {
        if (rollingDiceIndexes.length > 0) {
            const timeoutId = setTimeout(() => {
                setRollingDiceIndexes([]);
            }, 1000); // Temps d'attente de l'animation, ajustez-le selon vos besoins
            return () => clearTimeout(timeoutId);
        }
    }, [rollingDiceIndexes]);

    return (
        <div className="des_section">
            {rollsCount === 0 && (
                <button onClick={rollDice}>Lancer les dés</button>
            )}
            {rollsCount > 0 && rollsCount < 3 && (
                <button onClick={relaunchDice}>Relancer certains dés</button>
            )}
            {showResultButton && rollsCount === 3 && (
                <button onClick={navigateToResult}>Résultat</button>
            )}

            <div>
                <div className="des_container">
                    {diceValues.map((value, index) => (
                        <span
                            key={index}
                            onClick={() => handleDiceClick(index)}
                            className={`${
                                selectedDiceIndexes.includes(index) ? 'selected' : ''
                            } ${rollingDiceIndexes.includes(index) ? 'rotating' : ''}`}
                        >
                            {value}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
