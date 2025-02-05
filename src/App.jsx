import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/pastes" element={<Paste />} />
        <Route path="/pastes/:id" element={<ViewPaste />} />
      </Routes>
    </Router>
  );
}

export default App;
