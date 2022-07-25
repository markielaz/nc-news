import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Articles from './components/Articles';
import TopicPage from './components/TopicPage';
import SingleArticle from './components/SingleArticle';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Articles />}/>
          <Route path="/topics/:topic" element={<TopicPage />}/>
          <Route path="/articles/:article_id" element={<SingleArticle />}/>
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
