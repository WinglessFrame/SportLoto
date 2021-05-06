import './styles/App.scss';
import Header from './components/Header'
import Menu from './components/Menu'
import Bet from './components/Pages/Bet'

function App() {
  return (
    <div className="App">

      <Header/>

      <Menu/>

      <div className="container-main">
        <Bet></Bet>
      </div>

    </div>
  );
}

export default App;
