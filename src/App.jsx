import { Routes, Route } from 'react-router-dom';
import {Home, Graph, Veintiuno, HorseRace} from './pages';
import './App.css'
import TrollButton from './Trollbutton';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/21" element={<Veintiuno />} />
        <Route path="/21" element={<Veintiuno />} />
        <Route path="/horse" element={<HorseRace />} />
      </Routes>
      <TrollButton />
    </div>
  )
}

export default App
