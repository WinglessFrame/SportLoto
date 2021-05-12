import { BrowserRouter, Route } from 'react-router-dom';

import './styles/App.scss';
import Header from './components/Header'
import Menu from './components/Menu'
import Game from './components/Pages/Game'
import History from './components/Pages/History';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Header />

        <div className='menu-main-container'>

          <Menu />

          <div className="container-main">
            
            <Route exact path="/game">
              <Game />
            </Route>

            <Route exact path="/history">
              <History/>
            </Route>

          </div>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
