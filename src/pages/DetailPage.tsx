import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Job } from '../types';
import { fetchJobById } from '../services/jobService';
import { formatCurrency } from '../utils';
import { useFavorites } from '../context/FavoritesContext';
import SkeletonDetail from '../components/SkeletonDetail';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [applied, setApplied] = useState<boolean>(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const jobId = Number(id);
    if (!isNaN(jobId)) {
      fetchJobById(jobId).then((data) => {
        if (isMounted) {
          setJob(data);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div aria-busy="true">
        <p className="sr-only" role="status">
          Đang tải thông tin chi tiết việc làm...
        </p>
        <SkeletonDetail />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900">Không tìm thấy tin tuyển dụng</h1>
        <p className="mt-2 text-sm text-slate-600">
          Công việc bạn đang tìm kiếm có thể đã hết hạn hoặc đường dẫn không chính xác.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            ← Quay lại danh sách việc làm
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(job.id);

  return (
    <article aria-labelledby="job-title" className="space-y-6">
      {/* Breadcrumb điều hướng */}
      <nav aria-label="Breadcrumb">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus:outline-none focus:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại danh sách việc làm
        </Link>
      </nav>

      {/* Thẻ chính thông tin công việc */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header chi tiết */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <img
              src={job.logo}
              alt={job.logoAlt}
              width={64}
              height={64}
              className="w-16 h-16 rounded-xl object-contain bg-slate-50 border border-slate-100 p-2 flex-shrink-0"
            />
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {job.company}
              </span>
              <h1 id="job-title" className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
                <span>•</span>
                <span>Ngày đăng: {job.postedDate}</span>
              </div>
            </div>
          </div>

          {/* Các nút hành động */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Nút lưu yêu thích */}
            <button
              type="button"
              onClick={() => toggleFavorite(job.id)}
              aria-label={
                favorited
                  ? `Bỏ lưu tin tuyển dụng ${job.title} tại ${job.company}`
                  : `Lưu tin tuyển dụng ${job.title} tại ${job.company}`
              }
              aria-pressed={favorited}
              className={`p-2.5 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-slate-100'
              }`}
            >
              <svg
                className={`w-5 h-5 ${favorited ? 'fill-current' : 'fill-none'}`}
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Nút Ứng tuyển */}
            <button
              type="button"
              onClick={() => setApplied(true)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 ${
                applied
                  ? 'bg-slate-100 text-slate-600 border border-slate-300 cursor-default'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
              }`}
            >
              {applied ? '✓ Đã gửi hồ sơ' : 'Ứng tuyển ngay'}
            </button>
          </div>
        </div>

        {/* Lưới thông tin tổng quan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <p className="text-xs text-slate-500 font-medium">Mức lương dự kiến</p>
            <p className="mt-1 text-sm sm:text-base font-bold text-emerald-700">
              {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Hình thức làm việc</p>
            <p className="mt-1 text-sm sm:text-base font-bold text-slate-900">{job.jobType}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Cấp bậc yêu cầu</p>
            <p className="mt-1 text-sm sm:text-base font-bold text-slate-900">{job.level}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Chuyên ngành</p>
            <p className="mt-1 text-sm sm:text-base font-bold text-slate-900">{job.category}</p>
          </div>
        </div>

        {/* Mô tả công việc */}
        <section aria-labelledby="desc-heading" className="space-y-3 pt-2">
          <h2 id="desc-heading" className="text-lg sm:text-xl font-bold text-slate-900">
            Mô tả công việc
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </section>

        {/* Yêu cầu ứng viên */}
        <section aria-labelledby="req-heading" className="space-y-3 pt-4 border-t border-slate-100">
          <h2 id="req-heading" className="text-lg sm:text-xl font-bold text-slate-900">
            Yêu cầu ứng viên
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-emerald-700 font-bold text-lg leading-none mt-0.5">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quyền lợi được hưởng */}
        <section aria-labelledby="benefit-heading" className="space-y-3 pt-4 border-t border-slate-100">
          <h2 id="benefit-heading" className="text-lg sm:text-xl font-bold text-slate-900">
            Quyền lợi được hưởng
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
            {job.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-emerald-700 font-bold text-base leading-none mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Thông tin nộp hồ sơ */}
        <section aria-labelledby="apply-heading" className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
          <h2 id="apply-heading" className="text-base font-bold text-slate-900">
            Cách thức ứng tuyển
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Ứng viên quan tâm vui lòng bấm nút "Ứng tuyển ngay" ở phía trên hoặc gửi hồ sơ CV trực tiếp về phòng tuyển dụng của <strong className="text-slate-800">{job.company}</strong> tại {job.location}.
          </p>
        </section>
      </div>
    </article>
  );
};

export default DetailPage;
