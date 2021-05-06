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

        <Menu />

        <div className="container-main">
          <Route exact path="/game">
            <Bet/>
          </Route>
          
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
