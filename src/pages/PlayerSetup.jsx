import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Plus, X, User, Wand2 } from 'lucide-react'; // Needs lucide-react installed in package.json

const PlayerSetup = () => {
    const navigate = useNavigate();
    const { players, addPlayer, removePlayer, updatePlayerName, impostorCount, setImpostorCount, setPlayers } = useGame();
    const [newPlayerName, setNewPlayerName] = useState('');

    // Auto-add 3 empty slots if empty on mount
    useEffect(() => {
        if (players.length === 0) {
            addPlayer('Jugador 1');
            addPlayer('Jugador 2');
            addPlayer('Jugador 3');
        }
    }, []);

    const handleAddPlayer = (e) => {
        e.preventDefault();
        if (players.length < 20) {
            addPlayer(`Jugador ${players.length + 1}`);
        }
    };

    const handleMagicPopulate = () => {
        const magicNames = ['Enzo', 'Mateo', 'Mama', 'Papa', 'Lara', 'Nacho'];
        const newPlayers = magicNames.map((name, index) => ({
            id: Date.now() + index, // Ensure unique IDs
            name: name,
            isImpostor: false
        }));
        setPlayers(newPlayers);
    };

    const handleContinue = () => {
        if (players.length >= 2) {
            navigate('/categories');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="container"
        >
            <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', paddingRight: '1rem' }}>
                    ←
                </button>
                <h2>Configuración</h2>
            </header>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Impostores
                </h3>
                <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', alignItems: 'center' }}>
                    {[1, 2, 3].map(count => (
                        <button
                            key={count}
                            onClick={() => setImpostorCount(count)}
                            style={{
                                flex: 1,
                                background: impostorCount === count ? 'var(--primary)' : 'transparent',
                                border: 'none',
                                color: impostorCount === count ? 'white' : 'var(--text-muted)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'all 0.2s',
                                margin: '0 0.25rem'
                            }}
                        >
                            {count} {count === 1 ? 'Impostor' : 'Impostores'}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Jugadores ({players.length})
                    </h3>
                    <button
                        onClick={handleMagicPopulate}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary-glow)',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        title="Autocompletar jugadores"
                    >
                        <Wand2 size={20} />
                    </button>
                </div>

                <Reorder.Group axis="y" values={players} onReorder={setPlayers} style={{ listStyle: 'none', padding: 0 }}>
                    <AnimatePresence>
                        {players.map((player) => (
                            <Reorder.Item
                                key={player.id}
                                value={player}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileDrag={{ scale: 1.02 }}
                                className="glass-panel"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.75rem 1rem',
                                    marginBottom: '0.75rem',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'grab',
                                    userSelect: 'none'
                                }}
                            >
                                <div style={{ marginRight: '1rem', cursor: 'grab', color: 'var(--text-muted)' }}>
                                    <GripVertical size={20} />
                                </div>
                                <User size={20} color="var(--primary-glow)" style={{ marginRight: '1rem' }} />
                                <input
                                    type="text"
                                    value={player.name}
                                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                                    // Prevent drag when typing
                                    onPointerDown={(e) => e.stopPropagation()}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        padding: 0,
                                        flex: 1,
                                        fontSize: '1.1rem',
                                        color: 'white'
                                    }}
                                />
                                {players.length > 2 && (
                                    <button
                                        onClick={() => removePlayer(player.id)}
                                        // Prevent drag when clicking remove
                                        onPointerDown={(e) => e.stopPropagation()}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--text-muted)',
                                            cursor: 'pointer',
                                            padding: '0.5rem'
                                        }}
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </Reorder.Item>
                        ))}
                    </AnimatePresence>
                </Reorder.Group>

                {players.length < 20 && (
                    <button
                        onClick={handleAddPlayer}
                        className="glass-panel"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'var(--text-muted)',
                            borderStyle: 'dashed',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        <Plus size={20} style={{ marginRight: '0.5rem' }} /> Añadir Jugador
                    </button>
                )}
            </div>

            <button className="btn-primary" onClick={handleContinue} disabled={players.length < 2} style={{ opacity: players.length < 2 ? 0.5 : 1 }}>
                Continuar
            </button>

        </motion.div>
    );
};

export default PlayerSetup;
