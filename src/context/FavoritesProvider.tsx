import React, { useReducer, useEffect, ReactNode } from 'react';
import {
  FavoritesContext,
  favoritesReducer,
  loadFavoritesFromStorage,
  STORAGE_KEY,
} from './FavoritesContext';

interface FavoritesProviderProps {
  children: ReactNode;
}

/**
 * Provider bọc toàn bộ ứng dụng để chia sẻ trạng thái yêu thích
 */
export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: loadFavoritesFromStorage(),
  });

  // Lắng nghe sự kiện storage để đồng bộ nếu người dùng mở trên nhiều tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed: unknown = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            dispatch({ type: 'SET_FAVORITES', payload: parsed as number[] });
          }
        } catch {
          // Bỏ qua lỗi parse
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleFavorite = (id: number) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  const isFavorite = (id: number): boolean => {
    return state.favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        isFavorite,
        toggleFavorite,
        favoriteCount: state.favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
