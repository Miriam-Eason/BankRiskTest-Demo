import Home from './components/Home';
import userData from './data/data.json';

console.log('Excel JSON data:', userData);

function App() {
  return <Home totalUsers={userData.length} />;
}

export default App;
