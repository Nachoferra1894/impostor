import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}
        >
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="floating"
            >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🕵️‍♂️</div>
            </motion.div>

            <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>IMPOSTOR</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
                ¿Quién miente?
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => navigate('/setup')}
                style={{ maxWidth: '300px' }}
            >
                Jugar Ahora
            </motion.button>
        </motion.div>
    );
};

export default Landing;
