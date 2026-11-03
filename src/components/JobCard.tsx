import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';
import { formatCurrency, truncateText } from '../utils';
import { useFavorites } from '../context/FavoritesContext';

interface JobCardProps {
  job: Job;
  onQuickView?: (job: Job, triggerElement: HTMLElement) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onQuickView }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(job.id);

  return (
    <article className="flex flex-col bg-white rounded-xl border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200 p-5 relative group">
      {/* Header card: Logo, thông tin công ty và nút yêu thích */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={job.logo}
            alt={job.logoAlt}
            width={48}
            height={48}
            loading="lazy"
            className="w-12 h-12 rounded-lg object-contain bg-slate-50 border border-slate-100 p-1 flex-shrink-0"
          />
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {job.company}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-600">
              <svg
                className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        {/* Nút lưu yêu thích (Favorites) */}
        <button
          type="button"
          onClick={() => toggleFavorite(job.id)}
          aria-label={
            favorited
              ? `Bỏ lưu tin tuyển dụng ${job.title} tại ${job.company}`
              : `Lưu tin tuyển dụng ${job.title} tại ${job.company}`
          }
          aria-pressed={favorited}
          className={`p-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
            favorited
              ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-100'
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
      </div>

      {/* Tiêu đề tin tuyển dụng */}
      <h2 className="mt-3 text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
        <Link
          to={`/item/${job.id}`}
          className="focus:outline-none focus:underline"
        >
          {job.title}
        </Link>
      </h2>

      {/* Mức lương nổi bật */}
      <div className="mt-2 text-sm font-bold text-emerald-700 flex items-center gap-1.5">
        <svg
          className="w-4 h-4 text-emerald-700 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
        </span>
      </div>

      {/* Tags phân loại */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
          {job.jobType}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          {job.level}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          {job.category}
        </span>
      </div>

      {/* Đoạn mô tả ngắn gọn */}
      <p className="mt-3 text-xs text-slate-600 leading-relaxed flex-1">
        {truncateText(job.description, 110)}
      </p>

      {/* Footer card: Ngày đăng và các nút hành động */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-600">
          Đăng: {job.postedDate}
        </span>

        <div className="flex items-center gap-2">
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => onQuickView(job, e.currentTarget)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Xem nhanh
            </button>
          )}

          <Link
            to={`/item/${job.id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-600"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
