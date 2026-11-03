import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';
import { formatCurrency } from '../utils';
import { useFavorites } from '../context/FavoritesContext';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElement: HTMLElement | null; // Phần tử đã kích hoạt mở modal để trả focus khi đóng
}

export const JobModal: React.FC<JobModalProps> = ({
  job,
  isOpen,
  onClose,
  triggerElement,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  // BẪY FOCUS (Focus Trap), phím ESC và khóa cuộn nền (Scroll Lock)
  useEffect(() => {
    if (!isOpen || !job) return;

    // 1. Khóa cuộn trang nền khi mở modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Tự động focus vào nút đóng khi mở modal
    const timeoutId = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 3. Xử lý bẫy phím Tab và phím ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      // Đóng modal khi nhấn phím Escape (ESC)
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Xoay vòng tiêu điểm (Tab / Shift + Tab) chỉ bên trong modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Khi nhấn Shift + Tab tại phần tử đầu tiên -> chuyển focus về phần tử cuối
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Khi nhấn Tab tại phần tử cuối cùng -> chuyển focus về phần tử đầu
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Dọn dẹp hiệu ứng khi đóng modal
    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // 4. Trả tiêu điểm (focus) về nút đã kích hoạt mở modal
      if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [isOpen, job, onClose, triggerElement]);

  if (!isOpen || !job) {
    return null;
  }

  const favorited = isFavorite(job.id);

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      {/* Hộp thoại Dialog */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-job-title"
        onClick={(e) => e.stopPropagation()} // Chặn sự kiện click để không đóng khi bấm bên trong modal
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden focus:outline-none"
        tabIndex={-1}
      >
        {/* Header Modal */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-start gap-3.5">
            <img
              src={job.logo}
              alt={job.logoAlt}
              width={52}
              height={52}
              className="w-13 h-13 rounded-xl object-contain bg-white border border-slate-200 p-1.5 flex-shrink-0 shadow-sm"
            />
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {job.company}
              </span>
              <h2
                id="modal-job-title"
                className="mt-1 text-lg sm:text-xl font-extrabold text-slate-900 leading-snug"
              >
                {job.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                <span>📍 {job.location}</span>
                <span>•</span>
                <span>📅 Đăng ngày: {job.postedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Nút yêu thích trong modal */}
            <button
              type="button"
              onClick={() => toggleFavorite(job.id)}
              aria-label={
                favorited
                  ? `Bỏ lưu tin tuyển dụng ${job.title}`
                  : `Lưu tin tuyển dụng ${job.title}`
              }
              aria-pressed={favorited}
              className={`p-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50'
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

            {/* Nút đóng modal X */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Đóng cửa sổ chi tiết việc làm"
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Nội dung chi tiết có thể cuộn */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Mức lương và thông số chính */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <div>
              <p className="text-xs text-slate-600 font-medium">Mức lương</p>
              <p className="mt-0.5 text-sm font-bold text-emerald-800">
                {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">Hình thức</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">{job.jobType}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">Cấp bậc</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">{job.level}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">Ngành nghề</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">{job.category}</p>
            </div>
          </div>

          {/* Mô tả công việc */}
          <section aria-labelledby="modal-desc-heading" className="space-y-2">
            <h3 id="modal-desc-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Mô tả công việc
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </section>

          {/* Yêu cầu ứng viên */}
          <section aria-labelledby="modal-req-heading" className="space-y-2 pt-3 border-t border-slate-100">
            <h3 id="modal-req-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Yêu cầu ứng viên
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Quyền lợi */}
          <section aria-labelledby="modal-benefit-heading" className="space-y-2 pt-3 border-t border-slate-100">
            <h3 id="modal-benefit-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Quyền lợi được hưởng
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer Modal: Link chuyển sang trang chi tiết /item/:id và nút Đóng */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            Đóng
          </button>

          <Link
            to={`/item/${job.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600"
          >
            <span>Xem trang đầy đủ</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
