import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GameProvider } from './context/GameContext'; // Will create this next
import Landing from './pages/Landing'; // Will create
import PlayerSetup from './pages/PlayerSetup'; // Will create
import CategorySelection from './pages/CategorySelection'; // Will create
import RoleReveal from './pages/RoleReveal'; // Will create
import GameSession from './pages/GameSession'; // Will create
import Results from './pages/Results'; // Will create

function App() {
  return (
    <Router>
      <GameProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/setup" element={<PlayerSetup />} />
            <Route path="/categories" element={<CategorySelection />} />
            <Route path="/reveal" element={<RoleReveal />} />
            <Route path="/game" element={<GameSession />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </AnimatePresence>
      </GameProvider>
    </Router>
  );
}

export default App;
