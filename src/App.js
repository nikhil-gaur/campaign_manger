import './App.css';
import Header from './Header';
import Feed from "./Feed";

function App() {
  return (
    <div className="app">

      {/* app seprated into 2 parts Header and Feed */}
      
      <Header />
      <Feed />
      
    </div>
  );
}

export default App;
