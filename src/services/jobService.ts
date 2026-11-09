import rawJobData from '../data/data.json';
import { Job } from '../types';

// Ép kiểu dữ liệu JSON sang mảng Job chuẩn TypeScript
const jobs: Job[] = rawJobData as Job[];

/**
 * Giả lập gọi API bất đồng bộ lấy danh sách tin tuyển dụng với độ trễ khoảng 800ms
 * Kích hoạt hiệu ứng Skeleton Loading chân thực và rõ ràng khi quay video demo
 */
export function fetchJobs(): Promise<Job[]> {
  const delay = 800;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...jobs]);
    }, delay);
  });
}

/**
 * Giả lập gọi API bất đồng bộ lấy chi tiết một tin tuyển dụng theo id với độ trễ khoảng 800ms
 */
export function fetchJobById(id: number): Promise<Job | null> {
  const delay = 800;
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = jobs.find((job) => job.id === id);
      resolve(found ? { ...found } : null);
    }, delay);
  });
}
