import { useEffect, useRef, useState } from 'react';
import DataQuery from './components/DataQuery';
import Home from './components/Home';
import RiskAssessment from './components/RiskAssessment';
import UserList from './components/UserList';
import userData from './data/data.json';

console.log('Excel JSON data:', userData);

export type ViewType = 'home' | 'userList' | 'riskAssessment' | 'dataQuery';

const TRANSITION_DURATION = 200;

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const fadeOutTimerRef = useRef<number | null>(null);
  const fadeInTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeOutTimerRef.current) {
        window.clearTimeout(fadeOutTimerRef.current);
      }
      if (fadeInTimerRef.current) {
        window.clearTimeout(fadeInTimerRef.current);
      }
    };
  }, []);

  const handleNavigate = (nextView: ViewType) => {
    if (nextView === currentView || isTransitioning) {
      return;
    }

    if (fadeOutTimerRef.current) {
      window.clearTimeout(fadeOutTimerRef.current);
    }

    if (fadeInTimerRef.current) {
      window.clearTimeout(fadeInTimerRef.current);
    }

    setIsTransitioning(true);
    setIsVisible(false);

    fadeOutTimerRef.current = window.setTimeout(() => {
      setCurrentView(nextView);
      setIsVisible(true);

      fadeInTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }, TRANSITION_DURATION);
  };

  let activeView: React.ReactNode;

  if (currentView === 'userList') {
    activeView = (
      <UserList
        onBack={() => handleNavigate('home')}
        totalUsers={userData.length}
        users={userData}
      />
    );
  } else if (currentView === 'riskAssessment') {
    activeView = <RiskAssessment onBack={() => handleNavigate('home')} users={userData} />;
  } else if (currentView === 'dataQuery') {
    activeView = <DataQuery onBack={() => handleNavigate('home')} users={userData} />;
  } else {
    activeView = <Home totalUsers={userData.length} onNavigate={handleNavigate} />;
  }

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${isTransitioning ? 'pointer-events-none' : ''}`}
    >
      {activeView}
    </div>
  );
}

export default App;
