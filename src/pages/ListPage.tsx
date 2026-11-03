import React, { useEffect, useState } from 'react';
import { Job } from '../types';
import { fetchJobs } from '../services/jobService';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';

export const ListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  return (
    <div className="space-y-6">
      {/* Banner giới thiệu & Thống kê */}
      <section
        aria-labelledby="jobs-heading"
        className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm"
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
            Cơ hội nghề nghiệp 2026
          </span>
          <h1 id="jobs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Khám phá việc làm hấp dẫn nhất
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Hơn 20+ vị trí tuyển dụng đa ngành nghề từ các doanh nghiệp công nghệ, tài chính và dịch vụ hàng đầu tại Việt Nam.
          </p>
        </div>

        {/* Thống kê nhanh */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-sm text-slate-600">
          <div>
            <span className="font-bold text-slate-900">
              {isLoading ? '...' : jobs.length}
            </span> tin tuyển dụng hiện có
          </div>
          <div>
            Địa điểm: <span className="font-medium text-slate-900">TP.HCM, Hà Nội, Đà Nẵng</span>
          </div>
        </div>
      </section>

      {/* Danh sách tin tuyển dụng có hiệu ứng Skeleton loading */}
      <section
        aria-label="Danh sách việc làm"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <div>
            {/* Thông báo cho trình đọc màn hình */}
            <p className="sr-only" role="status">
              Đang tải danh sách việc làm, vui lòng chờ...
            </p>

            {/* Lưới SkeletonCard: khớp kích thước và đúng 3 breakpoint (1/2/3 cột) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        ) : (
          /* Lưới tin tuyển dụng thật khi đã tải xong */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ListPage;
