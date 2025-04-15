import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TopUsersPage from './pages/TopUsersPage';
import TrendingPostsPage from './pages/TrendingPostsPage';
import FeedPage from './pages/FeedPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<TopUsersPage />} />
            <Route path="/trending" element={<TrendingPostsPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="bg-white py-4 mt-8">
          <div className="container mx-auto text-center text-gray-500 text-sm">
            Social Media Analytics Dashboard &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 