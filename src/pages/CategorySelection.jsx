import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { CATEGORIES } from '../data/categories';

const CategorySelection = () => {
    const navigate = useNavigate();
    const { setSelectedCategory, assignRoles } = useGame();

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        assignRoles(category); // Pass category explicitly
        navigate('/reveal');
    };

    // Helper for gradient colors based on index or id for variety
    const getGradient = (index) => {
        const colors = [
            'linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)', // Red
            'linear-gradient(135deg, #4834d4 0%, #686de0 100%)', // Blue
            'linear-gradient(135deg, #6ab04c 0%, #badc58 100%)', // Green
            'linear-gradient(135deg, #f0932b 0%, #ffbe76 100%)', // Orange
            'linear-gradient(135deg, #be2edd 0%, #e056fd 100%)', // Pink
            'linear-gradient(135deg, #22a6b3 0%, #7ed6df 100%)', // Cyan
        ];
        return colors[index % colors.length];
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
                <h2>Selección de categoría</h2>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', overflowY: 'auto', paddingBottom: '2rem' }}>
                {/* Random Category Button */}
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
                        handleSelectCategory(randomCategory);
                    }}
                    style={{
                        background: 'var(--bg-card)',
                        border: '2px dashed var(--primary-glow)',
                        borderRadius: '1rem',
                        padding: '1.5rem 1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '140px',
                        position: 'relative',
                        overflow: 'hidden',
                        gridColumn: '1 / -1' // Span full width
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        zIndex: 0
                    }} />
                    <div style={{ zIndex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
                        <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎲</span>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0', color: 'var(--primary-glow)', textAlign: 'center' }}>Aleatorio</h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cualquier categoría</span>
                    </div>
                </motion.button>

                {CATEGORIES.map((cat, index) => (
                    <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectCategory(cat)}
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '1rem',
                            padding: '1.5rem 1rem',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '140px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Accent Background */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: getGradient(index),
                            opacity: 0.1,
                            zIndex: 0
                        }} />

                        {/* Content */}
                        <div style={{ zIndex: 1, position: 'relative' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'white' }}>{cat.name}</h3>
                        </div>

                        <div style={{ zIndex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: getGradient(index).split(',')[1].split(' 0%')[0], // Extract first color
                                marginRight: '0.5rem'
                            }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.words.length} palabras</span>
                        </div>

                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default CategorySelection;
