import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ExpensesPage from '@/pages/ExpensesPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='expenses' element={<ExpensesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
