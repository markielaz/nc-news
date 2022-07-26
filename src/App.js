import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserContext } from './contexts/User';
import { useState } from 'react';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Articles from './components/Articles';
import TopicPage from './components/TopicPage';
import SingleArticle from './components/SingleArticle';
import LoginPage from './components/LoginPage'

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const isLoggedIn = Object.keys(loggedInUser).length > 0;



  return (
    <BrowserRouter>
    <UserContext.Provider value = {{loggedInUser, setLoggedInUser, isLoggedIn}}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Articles />}/>
            <Route path="/topics/:topic" element={<TopicPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/articles/:article_id" element={<SingleArticle />}/>
          </Routes>
          
          <Footer />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
