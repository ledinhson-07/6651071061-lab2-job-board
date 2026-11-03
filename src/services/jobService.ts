import rawJobData from '../data/data.json';
import { Job } from '../types';

// Ép kiểu dữ liệu JSON sang mảng Job chuẩn TypeScript
const jobs: Job[] = rawJobData as Job[];

/**
 * Giả lập gọi API bất đồng bộ lấy danh sách tin tuyển dụng với độ trễ hợp lý
 * Kích hoạt hiệu ứng Skeleton Loading chân thực và tối ưu tốc độ phản hồi LCP
 */
export function fetchJobs(): Promise<Job[]> {
  const delay = 450;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...jobs]);
    }, delay);
  });
}

/**
 * Giả lập gọi API bất đồng bộ lấy chi tiết một tin tuyển dụng theo id
 */
export function fetchJobById(id: number): Promise<Job | null> {
  const delay = 450;
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = jobs.find((job) => job.id === id);
      resolve(found ? { ...found } : null);
    }, delay);
  });
}
