import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [impostorCount, setImpostorCount] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [secretWord, setSecretWord] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [startingPlayer, setStartingPlayer] = useState(null);

    const addPlayer = (name) => {
        setPlayers([...players, { id: Date.now(), name, isImpostor: false }]);
    };

    const removePlayer = (id) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const updatePlayerName = (id, name) => {
        setPlayers(players.map(p => p.id === id ? { ...p, name } : p));
    };

    const assignRoles = (categoryOverride = null) => {
        // Reset roles
        const newPlayers = players.map(p => ({ ...p, isImpostor: false }));

        // Assign random impostors
        let assigned = 0;
        while (assigned < impostorCount) {
            const randomIndex = Math.floor(Math.random() * newPlayers.length);
            if (!newPlayers[randomIndex].isImpostor) {
                newPlayers[randomIndex].isImpostor = true;
                assigned++;
            }
        }

        setPlayers(newPlayers);

        // Select secret word
        const categoryToUse = categoryOverride || selectedCategory;
        if (categoryToUse) {
            const words = categoryToUse.words;
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setSecretWord(randomWord);
        }

        // Select starting player
        const randomStart = newPlayers[Math.floor(Math.random() * newPlayers.length)];
        setStartingPlayer(randomStart);
    };

    const resetGame = () => {
        setPlayers([]);
        setImpostorCount(1);
        setSelectedCategory(null);
        setSecretWord('');
        setGameStarted(false);
    };

    const playAgain = () => {
        // Keep players but reset roles and word
        setSecretWord('');
        setStartingPlayer(null);
    }

    const randomizeStartingPlayer = () => {
        if (players.length > 0) {
            const randomStart = players[Math.floor(Math.random() * players.length)];
            setStartingPlayer(randomStart);
        }
    };

    return (
        <GameContext.Provider value={{
            players,
            setPlayers, // exposed for reordering or bulk updates if needed
            addPlayer,
            removePlayer,
            updatePlayerName,
            impostorCount,
            setImpostorCount,
            selectedCategory,
            setSelectedCategory,
            secretWord,
            assignRoles,
            startingPlayer,
            resetGame,
            playAgain,
            randomizeStartingPlayer
        }}>
            {children}
        </GameContext.Provider>
    );
};
