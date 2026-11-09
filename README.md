# BÀI THỰC HÀNH THIẾT KẾ WEB - LAB 2 (MSSV: 6651071061)

## 1. Thông tin sinh viên & Đề tài cá nhân hóa
* **Họ và tên:** Lê Đình Sơn
* **Mã số sinh viên (MSSV):** 6651071061
* **Công thức cá nhân hóa theo đề bài:**
  * $S = 6 + 6 + 5 + 1 + 0 + 7 + 1 + 0 + 6 + 1 = 33$
  * $D = 33 \pmod{15} = 3 \rightarrow$ **Chủ đề website:** Tuyển dụng / Tìm việc (Job Board)
  * $F = 61 \pmod{10} = 1 \rightarrow$ **Bộ 3 tính năng bắt buộc:**
    1. **Yêu thích (Favorites)** lưu trữ bền vững qua `localStorage`
    2. **Modal chi tiết** với phím `ESC`, bẫy tiêu điểm (`Focus Trap`) và WAI-ARIA
    3. **Skeleton Loading** giả lập bất đồng bộ cho danh sách và chi tiết
  * $C = 6 \pmod{5} = 1 \rightarrow$ **Màu chủ đạo:** Emerald (`#059669`)
* **Repository GitHub:** `6651071061-lab2-job-board`

---

## 2. Công nghệ bắt buộc sử dụng
* **Build Tool:** Vite 5
* **Giao diện & Ngôn ngữ:** React 18 (Function Components & Hooks) + TypeScript (`"strict": true`, không dùng `any`)
* **Styling:** Tailwind CSS v3 (màu nhận diện `brand: #059669`, tương phản WCAG AA)
* **Routing:** React Router v6 (`react-router-dom@6`) với 2 route chính (`/`, `/item/:id`) và trang 404
* **Quản lý trạng thái:** React Hooks thuần (`useState`, `useReducer`, `useContext`)
* **Linter:** ESLint 9 (Flat Config `eslint.config.js`)
* **Kiểm thử tự động:** Vitest + `@testing-library/react` + `jsdom`
* **Triển khai:** Vercel với cấu hình `vercel.json` SPA rewrite

---

## 3. Ba tính năng bắt buộc

### 3.1. Tính năng 1: Yêu thích (Favorites lưu localStorage)
* Sử dụng **Context API + useReducer** (`FavoritesContext`) phân phối trạng thái toàn cục.
* Đồng bộ hai chiều với `localStorage` qua `useEffect` trong Provider (bọc trong khối `try/catch`).
* Có bộ lọc: "Tất cả" và "Chỉ hiện việc đã lưu", cùng badge đếm số lượng thời gian thực trên Header.
* Đồng bộ đa tab bằng sự kiện `storage`.

### 3.2. Tính năng 2: Modal xem nhanh chi tiết (Modal Dialog)
* Nhấn "Xem nhanh" trên `JobCard` để mở `JobModal` hiển thị thông tin đầy đủ và mức lương format bằng `formatCurrency()`.
* **Focus Trap:** Giữ vòng lặp tiêu điểm `Tab / Shift + Tab` bên trong modal; nếu tiêu điểm ngoài modal sẽ đưa về phần tử đầu tiên.
* **Đóng linh hoạt:** Hỗ trợ phím `ESC`, nút `X`, hoặc click nền mờ `backdrop`.
* **Scroll Lock & Trả focus:** Khóa cuộn trang khi mở và trả tiêu điểm về nút kích hoạt ban đầu khi đóng modal.
* **Chuẩn Accessibility:** Tích hợp `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.

### 3.3. Tính năng 3: Skeleton Loading
* Hàm `fetchJobs()` và `fetchJobById(id)` mô phỏng độ trễ tải mạng bất đồng bộ.
* `ListPage` hiển thị 6 thẻ `SkeletonCard` nhấp nháy `animate-pulse` khớp kích thước thẻ thật.
* `DetailPage` hiển thị khung xương `SkeletonDetail` trong lúc chờ tải dữ liệu.
* Gắn `aria-busy="true"`, `aria-hidden="true"` và thông báo `<p className="sr-only" role="status">`.

---

## 4. Cấu trúc thư mục dự án
```text
6651071061_LAB2/
├── public/
│   └── logos/               # 22 logo SVG cục bộ cho các doanh nghiệp
├── src/
│   ├── assets/              # Tài nguyên hình ảnh, biểu tượng
│   ├── components/          # Header, JobCard, JobModal, SkeletonCard, SkeletonDetail...
│   ├── context/             # FavoritesContext, FavoritesProvider
│   ├── data/                # data.json (22 tin tuyển dụng thực tế tại Việt Nam)
│   ├── pages/               # ListPage.tsx, DetailPage.tsx, NotFoundPage.tsx
│   ├── services/            # jobService.ts
│   ├── types.ts             # Interface Job, JobType, JobLevel
│   ├── utils.ts             # 4 hàm tiện ích (formatCurrency, truncateText, validateEmail, debounce)
│   ├── utils.test.ts        # Bộ unit test Vitest nguyên văn từ đề bài
│   ├── App.tsx              # Cấu hình Router v6 và bố cục 3 breakpoint
│   ├── main.tsx             # Entry point React 18
│   └── index.css            # Tailwind directives, focus-visible
├── design/                  # Thư mục lưu trữ ảnh chụp wireframe/Figma
├── eslint.config.js         # Cấu hình ESLint Flat Config
├── tsconfig.json            # Cấu hình TypeScript root
├── tsconfig.app.json        # Cấu hình TypeScript strict mode cho React
├── tailwind.config.js       # Cấu hình Tailwind CSS v3
├── vercel.json              # Cấu hình rewrite phục vụ deploy SPA trên Vercel
└── package.json             # Danh sách gói phụ thuộc và scripts
```

---

## 5. Hướng dẫn cài đặt và chạy ứng dụng

```bash
cd 6651071061_LAB2

# Cài đặt thư viện
npm install

# Chạy môi trường phát triển
npm run dev

# Chạy kiểm thử tự động
npm run test

# Biên dịch sản phẩm
npm run build

# Chạy bản xem trước tối ưu
npm run preview
```

---

## 6. Kết quả kiểm tra chất lượng tự động

| Công cụ kiểm tra | Lệnh thực thi | Tiêu chuẩn đạt | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :---: |
| **TypeScript Typecheck** | `npx tsc --noEmit` | 0 lỗi | **0 lỗi** | ✅ Đạt |
| **ESLint Code Quality** | `npx eslint .` | 0 lỗi, 0 cảnh báo | **0 lỗi, 0 cảnh báo** | ✅ Đạt |
| **Vitest Unit Test** | `npm run test` | 6 test, 7 assertion | Chưa đo, sẽ cập nhật sau khi tự chạy | Đang chờ cập nhật |
| **Lighthouse Mobile** | Đo trên Google Chrome | Perf $\ge 70$, A11y $\ge 90$, BP $\ge 90$ | Chưa đo, sẽ cập nhật sau khi tự chạy | Đang chờ cập nhật |

---

## 7. Hướng dẫn triển khai (Deploy) lên Vercel

1. **Chuẩn bị cấu hình:** Dự án đã có sẵn file `vercel.json` rewrite toàn bộ URL về `/index.html`.
2. **Đẩy mã nguồn lên GitHub:** Đảm bảo toàn bộ commit đã được push lên repo `6651071061-lab2-job-board`.
3. **Đăng nhập Vercel:** Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
4. **Import Project:** Chọn **Add New...** $\rightarrow$ **Project**, chọn repo `6651071061-lab2-job-board` và bấm **Import**.
5. **Build Settings:**
   * **Framework Preset:** Vite
   * **Root Directory:** `./`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
6. **Deploy:** Nhấn **Deploy** để nhận đường link công khai dạng `https://6651071061-lab2-job-board.vercel.app`.
