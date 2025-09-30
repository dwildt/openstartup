import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/theme.jsx';
import { LanguageProvider } from './utils/i18n.jsx';
import MainPage from './pages/MainPage/MainPage';
import StartupPage from './pages/StartupPage/StartupPage';

function App() {
  // Use basename only in production for GitHub Pages
  const basename = import.meta.env.PROD ? '/openstartup' : '';

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router basename={basename}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/startup/:id" element={<StartupPage />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;