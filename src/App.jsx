import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './utils/theme.jsx';
import { LanguageProvider } from './utils/i18n.jsx';
import MainPage from './pages/MainPage/MainPage';
import StartupPage from './pages/StartupPage/StartupPage';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
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