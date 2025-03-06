import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='about' element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
