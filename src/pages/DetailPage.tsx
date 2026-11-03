import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <article aria-labelledby="job-title" className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link
          to="/"
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium focus:outline-none focus:underline"
        >
          ← Quay lại danh sách việc làm
        </Link>
      </nav>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h1 id="job-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Chi tiết tin tuyển dụng #{id}
        </h1>
        <p className="mt-2 text-slate-600">
          Nội dung chi tiết sẽ được hoàn thiện đầy đủ ở giai đoạn G7.
        </p>
      </div>
    </article>
  );
};

export default DetailPage;
