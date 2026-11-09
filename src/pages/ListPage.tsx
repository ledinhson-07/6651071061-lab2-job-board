import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job } from '../types';
import { fetchJobs } from '../services/jobService';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';
import JobModal from '../components/JobModal';
import { useFavorites } from '../context/FavoritesContext';

export const ListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // State quản lý Modal xem nhanh
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const { isFavorite, favoriteCount } = useFavorites();

  // Đọc cờ lọc từ URL params (?saved=true)
  const showSavedOnly = searchParams.get('saved') === 'true';

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchJobs().then((data) => {
      if (isMounted) {
        setJobs(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleFilter = (savedOnly: boolean) => {
    if (savedOnly) {
      setSearchParams({ saved: 'true' });
    } else {
      setSearchParams({});
    }
  };

  // Mở modal xem nhanh và ghi nhớ nút đã bấm để trả focus khi đóng
  const handleQuickView = (job: Job, trigger: HTMLElement) => {
    setSelectedJob(job);
    setTriggerElement(trigger);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Lọc danh sách việc làm hiển thị theo lựa chọn
  const displayedJobs = showSavedOnly
    ? jobs.filter((job) => isFavorite(job.id))
    : jobs;

  return (
    <div className="space-y-6">
      {/* Banner giới thiệu & Thống kê */}
      <section
        aria-labelledby="jobs-heading"
        className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 border-l-4 border-l-brand shadow-sm"
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            Cơ hội nghề nghiệp 2026
          </span>
          <h1 id="jobs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Khám phá việc làm hấp dẫn nhất
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Hơn 20 vị trí tuyển dụng đa ngành nghề từ các doanh nghiệp công nghệ, tài chính và dịch vụ hàng đầu tại Việt Nam.
          </p>
        </div>

        {/* Nút lọc: Tất cả việc làm / Việc đã lưu */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleToggleFilter(false)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand ${
                !showSavedOnly
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả ({jobs.length})
            </button>
            <button
              type="button"
              onClick={() => handleToggleFilter(true)}
              aria-pressed={showSavedOnly}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand ${
                showSavedOnly
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <svg
                className={`w-4 h-4 ${showSavedOnly ? 'fill-current' : 'fill-none'}`}
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
              <span>Chỉ hiện việc đã lưu</span>
              <span
                className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  showSavedOnly ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {favoriteCount}
              </span>
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-500">
            Hiển thị <span className="font-bold text-slate-900">{displayedJobs.length}</span> tin
          </div>
        </div>
      </section>

      {/* Danh sách tin tuyển dụng có Skeleton loading */}
      <section
        aria-label="Danh sách việc làm"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <div>
            <p className="sr-only" role="status">
              Đang tải danh sách việc làm, vui lòng chờ...
            </p>
            {/* Lưới SkeletonCard: đúng 3 breakpoint (1/2/3 cột) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        ) : displayedJobs.length === 0 ? (
          /* Trạng thái không có tin tuyển dụng nào phù hợp (khi lọc đã lưu mà chưa lưu tin nào) */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Bạn chưa lưu tin tuyển dụng nào
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Hãy nhấn biểu tượng trái tim trên các thẻ công việc để lưu lại và xem lại dễ dàng sau này.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => handleToggleFilter(false)}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
              >
                Xem tất cả việc làm
              </button>
            </div>
          </div>
        ) : (
          /* Lưới tin tuyển dụng thật: < 640px 1 cột, 640-1024px 2 cột, > 1024px 3 cột */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedJobs.map((job, idx) => (
              <JobCard
                key={job.id}
                job={job}
                priority={idx < 2}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal chi tiết (ESC, bẫy focus, đóng click nền, khóa cuộn) */}
      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        triggerElement={triggerElement}
      />
    </div>
  );
};

export default ListPage;
