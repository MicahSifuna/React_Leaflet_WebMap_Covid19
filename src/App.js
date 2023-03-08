
import Covid19 from "./components/Covid19"
import './App.css';
import Legend from "./components/Legend";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <Header />
      </header>
      <Covid19 />
      <Legend />
    </div>
  );
}

export default App;
