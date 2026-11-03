import rawJobData from '../data/data.json';
import { Job } from '../types';

// Ép kiểu dữ liệu JSON sang mảng Job chuẩn TypeScript
const jobs: Job[] = rawJobData as Job[];

/**
 * Giả lập gọi API bất đồng bộ lấy danh sách tin tuyển dụng với độ trễ 800–1200ms
 * Giúp kích hoạt hiệu ứng Skeleton Loading chân thực
 */
export function fetchJobs(): Promise<Job[]> {
  const delay = Math.floor(Math.random() * 400) + 800;
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
  const delay = Math.floor(Math.random() * 400) + 800;
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = jobs.find((job) => job.id === id);
      resolve(found ? { ...found } : null);
    }, delay);
  });
}
