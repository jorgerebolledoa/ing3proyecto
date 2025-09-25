import { Routes, Route } from 'react-router-dom';
import {Graph, Pokemon, Veintiuno, HorseRace, GamesMenu, ButtonGame} from './pages';
import TrollButton from './components/TrollButton/Trollbutton';
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<GamesMenu />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/21" element={<Veintiuno />} />
        <Route path="/horse" element={<HorseRace />} />
        <Route path="/buttonGame" element={<ButtonGame path="/graph"/>}></Route>
        <Route path="/troll" element={<TrollButton />} />
      </Routes>
    </div>
  )
}

export default App
