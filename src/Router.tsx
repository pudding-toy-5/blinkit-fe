import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './HomePage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
