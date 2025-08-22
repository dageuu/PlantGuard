import { useState } from 'react';
import Homepage from './pages/homepage.jsx';
import LandingPage from './pages/LandingPage.jsx';

export default function App() {
  const [showHomepage, setShowHomepage] = useState(false);

  return showHomepage ? (
    <Homepage />
  ) : (
    <LandingPage onGetStarted={() => setShowHomepage(true)} />
  );
}
