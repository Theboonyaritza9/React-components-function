import logo from './logo.svg';
import './App.css';
import Singlefile from './components/Singlefile';
import Multifile from './components/Multifile';

function App() {
  return (
    <div className="App">
      <Singlefile />
      <hr/>
      <Multifile />
    </div>
  );
}

export default App;
