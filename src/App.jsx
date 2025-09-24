import { Routes, Route } from 'react-router-dom';
import {Home, Graph} from './pages';
import './App.css'
import TrollButton from './Trollbutton';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
      <TrollButton />
    </div>
  )
}

export default App
