/**
 * Định dạng số tiền thành chuỗi tiền tệ theo chuẩn vi-VN (mặc định VND)
 * Ví dụ: formatCurrency(150000) -> "150.000 ₫"
 */
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Cắt ngắn văn bản nếu vượt quá độ dài tối đa và thêm dấu ba chấm "..."
 * Ví dụ: truncateText('Hello', 10) -> 'Hello'
 *        truncateText('Hello world', 5) -> 'Hello...'
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * Kiểm tra tính hợp lệ của địa chỉ email (yêu cầu có dấu chấm trong phần tên miền)
 * Ví dụ: validateEmail('abc@example.com') -> true
 *        validateEmail('abc@com') -> false
 */
export function validateEmail(email: string): boolean {
  // Regex yêu cầu: có phần tên người dùng, ký tự @, phần tên miền cấp 2 và tên miền cấp cao nhất phân tách bằng dấu chấm
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Trì hoãn việc gọi hàm cho đến khi qua khoảng thời gian delay tính từ lần gọi cuối cùng
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: unknown, ...args: Parameters<T>): void {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };

  return debounced as unknown as T;
}
