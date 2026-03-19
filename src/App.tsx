import { useState } from 'react';
import DataQuery from './components/DataQuery';
import Home from './components/Home';
import RiskAssessment from './components/RiskAssessment';
import UserList from './components/UserList';
import userData from './data/data.json';

console.log('Excel JSON data:', userData);

export type ViewType = 'home' | 'userList' | 'riskAssessment' | 'dataQuery';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  if (currentView === 'userList') {
    return <UserList onBack={() => setCurrentView('home')} totalUsers={userData.length} />;
  }

  if (currentView === 'riskAssessment') {
    return <RiskAssessment onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'dataQuery') {
    return <DataQuery onBack={() => setCurrentView('home')} />;
  }

  return <Home totalUsers={userData.length} onNavigate={setCurrentView} />;
}

export default App;
