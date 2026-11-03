import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Job } from '../types';
import { fetchJobById } from '../services/jobService';
import { formatCurrency } from '../utils';
import SkeletonDetail from '../components/SkeletonDetail';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-slate-900">Không tìm thấy tin tuyển dụng</h1>
        <p className="mt-2 text-sm text-slate-600">
          Công việc bạn đang tìm kiếm có thể đã hết hạn hoặc không tồn tại.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article aria-labelledby="job-detail-title" className="space-y-6">
      {/* Breadcrumb quay lại */}
      <nav aria-label="Breadcrumb">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 focus:outline-none focus:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại danh sách việc làm
        </Link>
      </nav>

      {/* Thẻ chi tiết việc làm */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
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
              <h1 id="job-detail-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {job.title}
              </h1>
              <p className="mt-1 text-base font-semibold text-emerald-700">
                {job.company}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span>📍 {job.location}</span>
                <span>•</span>
                <span>📅 Đăng ngày: {job.postedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lương & Thông số cơ bản */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
          <div>
            <p className="text-xs text-slate-500 font-medium">Mức lương</p>
            <p className="mt-1 text-sm font-bold text-emerald-700">
              {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Hình thức</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{job.jobType}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Cấp bậc</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{job.level}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Ngành nghề</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{job.category}</p>
          </div>
        </div>

        {/* Mô tả công việc */}
        <section aria-labelledby="desc-heading" className="space-y-3 pt-2">
          <h2 id="desc-heading" className="text-lg font-bold text-slate-900">
            Mô tả công việc
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </section>

        {/* Yêu cầu công việc */}
        <section aria-labelledby="req-heading" className="space-y-3 pt-4 border-t border-slate-100">
          <h2 id="req-heading" className="text-lg font-bold text-slate-900">
            Yêu cầu ứng viên
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {job.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Quyền lợi */}
        <section aria-labelledby="benefit-heading" className="space-y-3 pt-4 border-t border-slate-100">
          <h2 id="benefit-heading" className="text-lg font-bold text-slate-900">
            Quyền lợi được hưởng
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {job.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default DetailPage;
