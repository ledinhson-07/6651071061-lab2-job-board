import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesProvider';
import Header from './components/Header';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
          {/* Header với điều hướng và bộ đếm yêu thích từ FavoritesContext */}
          <Header />

          {/* Nội dung chính với bố cục responsive */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/item/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Chân trang ngữ nghĩa */}
          <footer className="bg-white border-t border-slate-200 mt-auto py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
              <p>
                © 2026 JobBoard. Bài thực hành Thiết kế Web - LAB 2 (MSSV: 6651071061).
              </p>
              <p>
                Màu chủ đạo: <span className="font-semibold text-emerald-700">Emerald (#059669)</span>
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
};

export default App;
