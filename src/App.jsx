import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavouritesProvider } from './FavouritesContext';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './styles/App.css';

  // Main App Component
  // Sets up routing and global context providers
 
function App() {
  return (
    <FavouritesProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="app">
          {/* Main Routes */}
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>

          {/* Footer */}
          <footer className="app-footer">
            <p>&copy; 2025 Estate Agent App. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </FavouritesProvider>
  );
}

export default App;