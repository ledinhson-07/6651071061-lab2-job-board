import React from 'react';
import { Link } from 'react-router-dom';

export const ListPage: React.FC = () => {
  return (
    <section aria-labelledby="jobs-heading" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 id="jobs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Khám phá cơ hội nghề nghiệp
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Tổng hợp việc làm chất lượng cao tại Việt Nam
          </p>
        </div>
      </div>

      {/* Grid responsive 3 mức: <640px 1 cột, 640-1024px 2 cột, >1024px 3 cột */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-emerald-700">Mẫu kiểm tra điều hướng</p>
          <h2 className="mt-2 text-lg font-bold text-slate-900">Senior Frontend Developer</h2>
          <p className="mt-1 text-xs text-slate-500">FPT Software · Hà Nội</p>
          <div className="mt-4">
            <Link
              to="/item/1"
              className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus:outline-none focus:underline"
            >
              Xem chi tiết →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPage;
