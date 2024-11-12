import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import NewsFeed from './NewsFeed';
import ViewNews from './ViewNews';
import Toolbar from './Toolbar';
import Page404 from './Page404';

export default function App() {
  return (
    <Router>
      <Toolbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<ViewNews />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}
