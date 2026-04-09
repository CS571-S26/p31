import { Routes, Route } from 'react-router-dom';
import FeatherDeckLayout from './FeatherDeckLayout';
import Home from './../pages/Home';
import About from './../pages/About';
import BrowseBirds from "../pages/BrowseBirds";
import Decks from "./../pages/Decks";


function App() {
  return (
      <Routes>
        <Route path="/" element={<FeatherDeckLayout />}>
          <Route index element={<Home />} />
          <Route path="browsebirds" element={<BrowseBirds/>}/>
          <Route path="decks" element={<Decks/>}/>
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
  );
}

export default App;