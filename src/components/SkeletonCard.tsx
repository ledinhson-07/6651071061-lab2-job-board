import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-pulse"
    >
      {/* Header skeleton: Logo, tên công ty và nút */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0" />
          <div className="space-y-2">
            <div className="w-24 h-3 bg-slate-200 rounded" />
            <div className="w-16 h-2.5 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="w-9 h-9 bg-slate-100 rounded-lg border border-slate-200" />
      </div>

      {/* Tiêu đề skeleton */}
      <div className="mt-4 space-y-2">
        <div className="w-5/6 h-4 bg-slate-200 rounded" />
        <div className="w-3/5 h-4 bg-slate-200 rounded" />
      </div>

      {/* Mức lương skeleton */}
      <div className="mt-3 w-1/2 h-4 bg-emerald-100 rounded" />

      {/* Tags skeleton */}
      <div className="mt-3 flex gap-2">
        <div className="w-16 h-5 bg-slate-100 rounded" />
        <div className="w-14 h-5 bg-slate-100 rounded" />
        <div className="w-20 h-5 bg-slate-100 rounded" />
      </div>

      {/* Mô tả skeleton */}
      <div className="mt-4 space-y-2 flex-1">
        <div className="w-full h-2.5 bg-slate-100 rounded" />
        <div className="w-11/12 h-2.5 bg-slate-100 rounded" />
        <div className="w-4/5 h-2.5 bg-slate-100 rounded" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-20 h-3 bg-slate-100 rounded" />
        <div className="flex gap-2">
          <div className="w-16 h-7 bg-slate-100 rounded-lg" />
          <div className="w-16 h-7 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
