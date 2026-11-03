import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  favoriteCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ favoriteCount = 0 }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tên dự án */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-emerald-800 transition-colors">
              JB
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors block leading-tight">
                JobBoard 6651071061
              </span>
              <span className="text-xs text-slate-500 block leading-tight">
                Cổng tuyển dụng việc làm
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav aria-label="Điều hướng chính" className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Việc làm
            </Link>

            {/* Mục yêu thích */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-semibold"
              aria-label={`Tin đã lưu: ${favoriteCount} tin`}
            >
              <svg
                className="w-4 h-4 text-emerald-700 fill-current"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Đã lưu</span>
              <span
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-emerald-700 text-white"
                aria-hidden="true"
              >
                {favoriteCount}
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
