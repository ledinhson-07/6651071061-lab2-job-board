import React from 'react';

export const SkeletonDetail: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="space-y-6 animate-pulse"
    >
      {/* Breadcrumb skeleton */}
      <div className="w-40 h-4 bg-slate-200 rounded" />

      {/* Main card skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header với logo và tiêu đề */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-xl flex-shrink-0" />
            <div className="space-y-2.5">
              <div className="w-48 sm:w-80 h-6 bg-slate-200 rounded" />
              <div className="w-36 h-4 bg-slate-200 rounded" />
              <div className="w-28 h-3.5 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-lg" />
            <div className="w-28 h-10 bg-emerald-100 rounded-lg" />
          </div>
        </div>

        {/* Mức lương và thông tin phụ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
          <div className="space-y-1.5">
            <div className="w-16 h-3 bg-slate-200 rounded" />
            <div className="w-24 h-4 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1.5">
            <div className="w-16 h-3 bg-slate-200 rounded" />
            <div className="w-20 h-4 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1.5">
            <div className="w-16 h-3 bg-slate-200 rounded" />
            <div className="w-20 h-4 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1.5">
            <div className="w-16 h-3 bg-slate-200 rounded" />
            <div className="w-24 h-4 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Khối mô tả */}
        <div className="space-y-3 pt-4">
          <div className="w-36 h-5 bg-slate-200 rounded" />
          <div className="w-full h-3 bg-slate-100 rounded" />
          <div className="w-11/12 h-3 bg-slate-100 rounded" />
          <div className="w-4/5 h-3 bg-slate-100 rounded" />
        </div>

        {/* Khối yêu cầu công việc */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="w-40 h-5 bg-slate-200 rounded" />
          <div className="w-3/4 h-3 bg-slate-100 rounded" />
          <div className="w-5/6 h-3 bg-slate-100 rounded" />
          <div className="w-2/3 h-3 bg-slate-100 rounded" />
        </div>

        {/* Khối quyền lợi */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="w-32 h-5 bg-slate-200 rounded" />
          <div className="w-3/4 h-3 bg-slate-100 rounded" />
          <div className="w-4/5 h-3 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail;
