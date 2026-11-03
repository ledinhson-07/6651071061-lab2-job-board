import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-emerald-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
        404 - Không tìm thấy trang
      </h1>
      <p className="mt-3 text-base text-slate-600 max-w-md">
        Đường dẫn bạn yêu cầu không tồn tại hoặc đã được chuyển sang địa chỉ khác.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
