import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Eye, EyeOff } from 'lucide-react';

const RoleReveal = () => {
    const navigate = useNavigate();
    const { players, selectedCategory, secretWord } = useGame();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true); // True = "Pass to X", False = "Reveal Role"

    const currentPlayer = players[currentIndex];

    const handleReady = () => {
        setIsTransitioning(false);
    };

    const handleNext = () => {
        setIsRevealed(false);
        if (currentIndex < players.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsTransitioning(true);
        } else {
            navigate('/game');
        }
    };

    if (!currentPlayer) return <div>Cargando...</div>;

    return (
        <motion.div
            className="container"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}
        >
            <AnimatePresence mode="wait">
                {isTransitioning ? (
                    <motion.div
                        key="transition"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ width: '100%' }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>📱</div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Pásale el teléfono a</h2>
                        <h1 style={{ fontSize: '3rem', color: 'var(--primary-glow)', marginBottom: '3rem' }}>{currentPlayer.name}</h1>
                        <button className="btn-primary" onClick={handleReady}>
                            ¡Soy yo!
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ width: '100%' }}
                    >
                        <h2 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>La palabra para <span style={{ color: 'white' }}>{currentPlayer.name}</span></h2>
                        <h3 style={{ marginBottom: '3rem' }}>Categoría: <span style={{ color: 'var(--accent)' }}>{selectedCategory.name}</span></h3>

                        <div
                            className="glass-panel"
                            style={{
                                padding: '3rem 2rem',
                                marginBottom: '3rem',
                                background: isRevealed ? (currentPlayer.isImpostor ? 'rgba(236, 72, 153, 0.2)' : 'rgba(109, 40, 217, 0.2)') : 'var(--bg-card)',
                                border: isRevealed ? (currentPlayer.isImpostor ? '2px solid var(--secondary)' : '2px solid var(--primary)') : '2px solid var(--border-color)',
                                transition: 'all 0.4s ease'
                            }}
                        >
                            {!isRevealed ? (
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => setIsRevealed(true)}
                                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                >
                                    <Eye size={48} style={{ marginBottom: '1rem', color: 'var(--text-main)' }} />
                                    <span style={{ fontSize: '1.2rem' }}>Toca para revelar</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                >
                                    {currentPlayer.isImpostor ? (
                                        <>
                                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤫</div>
                                            <h2 style={{ fontSize: '2.5rem', color: 'var(--secondary)', margin: 0 }}>IMPOSTOR</h2>
                                            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Engaña a los demás</p>
                                        </>
                                    ) : (
                                        <>
                                            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-glow)', margin: 0, textShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}>
                                                {secretWord}
                                            </h1>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {isRevealed && (
                            <button className="btn-primary" onClick={handleNext}>
                                ¡Entendido!
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default RoleReveal;
