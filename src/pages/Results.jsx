import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const Results = () => {
    const navigate = useNavigate();
    const { players, secretWord, playAgain, resetGame } = useGame();

    const impostors = players.filter(p => p.isImpostor);

    const handlePlayAgain = () => {
        playAgain();
        navigate('/setup'); // Go back to setup to confirm players?? No, usually keeping players is better, but flow says setup first. 
        // Actually, standard flow: click play again -> maybe setup again or just setup names?
        // Let's go to Setup but with players already there.
    };

    const handleHome = () => {
        resetGame();
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem 1.5rem' }}
        >
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Resultados</h1>

            <div style={{ marginBottom: '3rem', width: '100%' }}>
                <h2 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>La palabra era</h2>
                <div className="glass-panel" style={{ padding: '1rem', marginTop: '0.5rem', background: 'rgba(109, 40, 217, 0.2)' }}>
                    <h1 style={{ margin: 0, color: 'white' }}>{secretWord}</h1>
                </div>
            </div>

            <div style={{ marginBottom: '3rem', width: '100%' }}>
                <h2 style={{ color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Impostores</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                    {impostors.map(imp => (
                        <motion.div
                            key={imp.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="glass-panel"
                            style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.2)', border: '1px solid var(--secondary)' }}
                        >
                            <h2 style={{ margin: 0, color: 'white' }}>{imp.name}</h2>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn-primary" onClick={handlePlayAgain}>
                    Jugar de nuevo
                </button>
                <button
                    className="btn-primary"
                    onClick={handleHome}
                    style={{ background: 'transparent', border: '1px solid var(--border-color)', boxShadow: 'none' }}
                >
                    Menú Principal
                </button>
            </div>
        </motion.div>
    );
};

export default Results;
