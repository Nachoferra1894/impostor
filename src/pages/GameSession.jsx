import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const GameSession = () => {
    const navigate = useNavigate();
    const { startingPlayer } = useGame();

    if (!startingPlayer) return <div>Cargando...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}
        >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>El jugador que empieza es:</h2>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="glass-panel"
                style={{ padding: '2rem 3rem', marginBottom: '4rem', background: 'rgba(255, 255, 255, 0.1)', borderColor: 'var(--primary-glow)' }}
            >
                <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--primary-glow)' }}>{startingPlayer.name}</h1>
            </motion.div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
                <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                    Debatan y voten para encontrar al Impostor.
                </p>

                <button
                    className="btn-primary"
                    onClick={() => navigate('/results')}
                    style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #be185d 100%)' }} // More reddish for "Reveal"
                >
                    Revelar al Impostor
                </button>
            </div>
        </motion.div>
    );
};

export default GameSession;
