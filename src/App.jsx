import { Routes, Route } from 'react-router-dom';
import {Home, Graph} from './pages';
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </div>
  )
}

export default App
