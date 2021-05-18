import { BrowserRouter, Route } from 'react-router-dom';

import './styles/App.scss';
import Header from './components/Header'
import Menu from './components/Menu'
import Game from './components/Pages/Game'
import History from './components/Pages/History';
import Profile from './components/Pages/Profile';
import Register from './components/Pages/Register';
import Login from './components/Pages/Login';

function App() {
  return (
      <BrowserRouter>
        <div className="App">

          <Header />

          <div className='menu-main-container'>

            <Menu />

            <div className="container-main">

              <Route exact path="/profile">
                <Profile />
              </Route>

              <Route exact path="/game">
                <Game />
              </Route>

              <Route exact path="/history">
                <History />
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/register">
                <Register />
              </Route>

            </div>
          </div>

        </div>
      </BrowserRouter>
  );
}

export default App;
