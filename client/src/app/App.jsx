import { BrowserRouter, Route } from 'react-router-dom';

import './styles/App.scss';
import Header from './components/Header'
import Menu from './components/Menu'
import Bet from './components/Pages/Bet'

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Header />

        <div className='menu-main-container'>
          <Menu />
          <div className="container-main">
            <Route exact path="/game">
              <Bet />
            </Route>
          </div>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
