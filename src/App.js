// import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Articles from './components/Articles';

function App() {
  return (
    <div className="App">
      <Header />
      <Articles />
      <Footer />
    </div>
  );
}

export default App;
