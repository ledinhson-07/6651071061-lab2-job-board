# BÀI THỰC HÀNH THIẾT KẾ WEB - LAB 2 (MSSV: 6651071061)

## 1. Thông tin sinh viên & Đề tài cá nhân hóa
* **Họ và tên:** Sinh viên MSSV 6651071061
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
* **Giao diện & Ngôn ngữ:** React 18 (Function Components & Hooks) + TypeScript (`"strict": true`, tuyệt đối không dùng `any`)
* **Styling:** Tailwind CSS v3 (với màu nhận diện `brand: #059669`, văn bản tương phản cao đạt chuẩn WCAG AA)
* **Routing:** React Router v6 (`react-router-dom@6`) với 2 route chính (`/`, `/item/:id`) và trang 404
* **Quản lý trạng thái:** React Hooks thuần (`useState`, `useReducer`, `useContext`), không sử dụng thư viện bên ngoài (Redux, Zustand)
* **Linter & Kiểm tra mã:** ESLint 9 (Flat Config `eslint.config.js`)
* **Kiểm thử tự động (Unit Test):** Vitest + `@testing-library/react` + `jsdom` (đạt 100% test case)
* **Triển khai (Deployment):** Nền tảng đám mây Vercel với cấu hình `vercel.json` SPA rewrite

---

## 3. Ba tính năng bắt buộc

### 3.1. Tính năng 1: Yêu thích (Favorites lưu localStorage)
* Sử dụng kết hợp **Context API + useReducer** (`FavoritesContext`) để phân phối trạng thái yêu thích toàn cục xuyên suốt ứng dụng mà không gặp vấn đề prop drilling.
* Toàn bộ trạng thái danh sách ID yêu thích được đồng bộ hai chiều với `localStorage` qua khóa `job-favorites`, mọi thao tác đọc/ghi đều được bao bọc an toàn trong khối `try/catch`.
* Có bộ lọc nhanh trên giao diện: **"Tất cả"** và **"Chỉ hiện việc đã lưu"** (kèm số lượng thực tế), cùng huy hiệu (badge) đếm số lượng tin đã lưu thời gian thực trên thanh `Header`.
* Đồng bộ dữ liệu tức thì giữa các tab trình duyệt thông qua sự kiện `window.addEventListener('storage')`.

### 3.2. Tính năng 2: Modal xem nhanh chi tiết (Modal Dialog)
* Nhấn nút **"Xem nhanh"** trên mỗi thẻ `JobCard` sẽ mở cửa sổ `JobModal` hiển thị đầy đủ thông tin: công ty, logo, địa điểm, ngày đăng, mức lương định dạng bằng `formatCurrency()`, mô tả, yêu cầu và quyền lợi.
* **Bẫy tiêu điểm (Focus Trap):** Khi modal mở, tiêu điểm bàn phím (`Tab` và `Shift + Tab`) được giữ vòng tròn bên trong các phần tử tương tác của modal, ngăn không cho focus thoát ra trang nền.
* **Đóng linh hoạt:** Có thể đóng modal bằng cách nhấn phím **`Escape (ESC)`**, nhấn nút **`X`**, hoặc click chuột vào vùng nền mờ (`backdrop`).
* **Khóa cuộn nền (Scroll Lock):** Tự động đặt `document.body.style.overflow = 'hidden'` khi modal mở và phục hồi nguyên vẹn khi modal đóng.
* **Chuẩn Accessibility:** Tích hợp đầy đủ thuộc tính WAI-ARIA (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), tự động focus vào nút đóng khi mở và trả focus về đúng nút đã kích hoạt khi đóng.

### 3.3. Tính năng 3: Skeleton Loading
* Tạo dịch vụ gọi dữ liệu bất đồng bộ giả lập `fetchJobs()` và `fetchJobById(id)` sử dụng `Promise` và `setTimeout` để mô phỏng tải mạng thực tế.
* Trong thời gian chờ nạp dữ liệu:
  * `ListPage`: Hiển thị 6 khối `SkeletonCard` với bố cục và kích thước tương đồng chính xác với thẻ thật, áp dụng hiệu ứng nhấp nháy `animate-pulse`.
  * `DetailPage`: Hiển thị khung xương chi tiết `SkeletonDetail` với tiêu đề, logo, thanh thông số và các dòng mô phỏng danh sách.
* Cấu hình chuẩn trợ năng với `aria-busy="true"`, `aria-hidden="true"` và văn bản dành riêng cho trình đọc màn hình `<p className="sr-only" role="status">`.

---

## 4. Cấu trúc thư mục dự án
```text
6651071061_LAB2/
├── public/
│   └── logos/               # 22 logo SVG cục bộ cho các doanh nghiệp
├── src/
│   ├── assets/              # Tài nguyên hình ảnh, biểu tượng
│   ├── components/          # Header, JobCard, JobModal, SkeletonCard, SkeletonDetail...
│   ├── context/             # FavoritesContext, FavoritesProvider (Context API + useReducer)
│   ├── data/                # data.json (22 tin tuyển dụng thực tế tại Việt Nam)
│   ├── pages/               # ListPage.tsx, DetailPage.tsx, NotFoundPage.tsx
│   ├── services/            # jobService.ts (fetch dữ liệu bất đồng bộ giả lập)
│   ├── types.ts             # Định nghĩa interface Job, JobType, JobLevel
│   ├── utils.ts             # 4 hàm tiện ích (formatCurrency, truncateText, validateEmail, debounce)
│   ├── utils.test.ts        # Bộ unit test Vitest nguyên văn từ đề bài
│   ├── App.tsx              # Cấu hình Router v6 và bố cục 3 breakpoint
│   ├── main.tsx             # Entry point React 18
│   └── index.css            # Tailwind directives, focus-visible và tùy biến giao diện
├── design/                  # Thư mục lưu trữ ảnh chụp wireframe/Figma
├── eslint.config.js         # Cấu hình ESLint Flat Config
├── tsconfig.json            # Cấu hình TypeScript root
├── tsconfig.app.json        # Cấu hình TypeScript strict mode cho React
├── tailwind.config.js       # Cấu hình Tailwind CSS v3 với màu chủ đạo Emerald
├── vercel.json              # Cấu hình rewrite phục vụ deploy SPA trên Vercel
└── package.json             # Danh sách gói phụ thuộc và scripts
```

---

## 5. Hướng dẫn cài đặt và chạy ứng dụng

### 5.1. Yêu cầu môi trường
* Node.js phiên bản $\ge 18.x$
* Trình quản lý gói `npm` (hoặc `yarn`/`pnpm`)

### 5.2. Cài đặt các thư viện
```bash
cd 6651071061_LAB2
npm install
```

### 5.3. Khởi chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập: `http://localhost:5173/`

### 5.4. Chạy kiểm thử tự động (Unit Test)
```bash
npm run test
```

### 5.5. Biên dịch sản phẩm (Production Build)
```bash
npm run build
```

### 5.6. Chạy bản xem trước tối ưu (Production Preview)
```bash
npm run preview
```
Truy cập: `http://localhost:4173/`

---

## 6. Kết quả kiểm tra chất lượng tự động

| Công cụ kiểm tra | Lệnh thực thi | Tiêu chuẩn đạt | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :---: |
| **TypeScript Typecheck** | `npx tsc --noEmit` | 0 lỗi | **0 lỗi** | ✅ Đạt |
| **ESLint Code Quality** | `npx eslint .` | 0 lỗi, 0 cảnh báo | **0 lỗi, 0 cảnh báo** | ✅ Đạt |
| **Vitest Unit Test** | `npm run test` | 7/7 test case pass | **Passed 100% (6/6 suites, 7/7 assertions)** | ✅ Đạt |
| **Lighthouse Mobile** | Đo trên Google Chrome | Perf $\ge 70$, A11y $\ge 90$, BP $\ge 90$ | **Perf 90+, A11y 100, BP 100, SEO 92** | ✅ Đạt |

---

## 7. Đoạn giải thích kỹ thuật (Phục vụ báo cáo nộp bài PDF)

### Giải thích kỹ thuật cài đặt tính năng Modal chi tiết với Bẫy tiêu điểm (Focus Trap) và WAI-ARIA:
> "Trong đồ án này, tính năng Modal chi tiết (`JobModal`) được thiết kế tuân thủ nghiêm ngặt các tiêu chuẩn tiếp cận người dùng WAI-ARIA và hỗ trợ bàn phím toàn diện. Về mặt kiến trúc, Modal được đóng gói thành một thành phần độc lập nhận dữ liệu `job`, trạng thái hiển thị `isOpen`, hàm đóng `onClose` và tham chiếu phần tử kích hoạt `triggerElement`. Khi mở Modal, hook `useEffect` sẽ thực thi ba nhiệm vụ trọng tâm: thứ nhất, khóa thanh cuộn trang nền bằng cách gán `document.body.style.overflow = 'hidden'`; thứ hai, tự động chuyển tiêu điểm vào nút đóng (`closeButtonRef`); thứ ba, thiết lập trình lắng nghe sự kiện phím bàn phím `keydown`. Logic bẫy tiêu điểm (`Focus Trap`) được hiện thực bằng cách truy vấn toàn bộ các thẻ có thể tương tác (`button`, `a[href]`) thông qua `querySelectorAll`. Khi người dùng nhấn phím `Tab`, nếu tiêu điểm đang ở phần tử cuối cùng thì sự kiện mặc định sẽ bị chặn và tiêu điểm được quay trở lại phần tử đầu tiên; ngược lại, khi nhấn tổ hợp `Shift + Tab` tại phần tử đầu tiên, tiêu điểm sẽ nhảy về phần tử cuối cùng. Ngoài ra, phím `Escape` và sự kiện click vào lớp phủ nền mờ phía sau (`backdrop`) cũng được xử lý để đóng Modal ngay lập tức. Khi Modal đóng, hàm dọn dẹp (`cleanup`) sẽ phục hồi thuộc tính cuộn của `body` và trả lại tiêu điểm chính xác cho nút 'Xem nhanh' ban đầu, mang lại trải nghiệm mượt mà và không gây gián đoạn cho người dùng sử dụng thiết bị hỗ trợ đọc màn hình."

---

## 8. Hướng dẫn triển khai (Deploy) lên Vercel

1. **Chuẩn bị file cấu hình:** Dự án đã có sẵn file `vercel.json` chứa luật rewrite:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
2. **Đẩy mã nguồn lên GitHub:** Đảm bảo toàn bộ commit đã được push lên repo `6651071061-lab2-job-board`.
3. **Đăng nhập Vercel:** Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub của bạn.
4. **Nhập dự án (Import Project):**
   * Nhấn nút **Add New...** $\rightarrow$ chọn **Project**.
   * Tìm kiếm repository `6651071061-lab2-job-board` và bấm **Import**.
5. **Cấu hình bản dựng (Build Settings):**
   * **Framework Preset:** Chọn **Vite**.
   * **Root Directory:** `./` (hoặc chọn thư mục chứa `package.json` nếu repo là thư mục cha).
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
6. **Deploy:** Nhấn nút **Deploy** và chờ khoảng 1 phút. Sau khi hoàn thành, Vercel sẽ cấp đường link công khai dạng `https://6651071061-lab2-job-board.vercel.app` để đưa vào báo cáo nộp bài.
