import { createContext, useContext } from 'react';

// Khóa lưu danh sách ID tin tuyển dụng yêu thích trong localStorage
export const STORAGE_KEY = 'job-favorites';

/**
 * Đọc mảng ID yêu thích từ localStorage một cách an toàn bằng try/catch
 */
export function loadFavoritesFromStorage(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'number')) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu favorites từ localStorage:', error);
    return [];
  }
}

/**
 * Ghi mảng ID yêu thích vào localStorage bọc trong try/catch phòng trường hợp quota đầy hoặc lỗi bảo mật
 */
export function saveFavoritesToStorage(favorites: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu favorites vào localStorage:', error);
  }
}

// Định nghĩa trạng thái và các hành động (Action) cho Reducer
export interface FavoritesState {
  favorites: number[];
}

export type FavoritesAction =
  | { type: 'TOGGLE_FAVORITE'; payload: number }
  | { type: 'SET_FAVORITES'; payload: number[] };

/**
 * Reducer thuần túy quản lý cập nhật danh sách yêu thích
 */
export function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      const exists = state.favorites.includes(id);
      const newFavorites = exists
        ? state.favorites.filter((favId) => favId !== id)
        : [...state.favorites, id];

      return { favorites: newFavorites };
    }
    case 'SET_FAVORITES': {
      return { favorites: action.payload };
    }
    default:
      return state;
  }
}

// Giao diện dữ liệu cung cấp qua Context
export interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  favoriteCount: number;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Custom hook giúp các component dễ dàng truy xuất và thao tác với FavoritesContext
 */
export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites phải được sử dụng bên trong một FavoritesProvider');
  }
  return context;
}
