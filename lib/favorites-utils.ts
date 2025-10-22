import type { Property } from './property-types';

const FAVORITES_KEY = 'property-platform-favorites';

export interface FavoriteProperty extends Property {
  addedAt: string;
}

export const favoritesUtils = {
  // Get all favorites from localStorage
  getFavorites(): FavoriteProperty[] {
    if (typeof window === 'undefined') return [];

    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  },

  // Add property to favorites
  addToFavorites(property: Property): void {
    if (typeof window === 'undefined') return;

    try {
      const favorites = this.getFavorites();
      const existingIndex = favorites.findIndex((fav) => fav.id === property.id);

      if (existingIndex === -1) {
        const favoriteProperty: FavoriteProperty = {
          ...property,
          isFavorite: true,
          addedAt: new Date().toISOString(),
        };
        favorites.push(favoriteProperty);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  },

  // Remove property from favorites
  removeFromFavorites(propertyId: string): void {
    if (typeof window === 'undefined') return;

    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter((fav) => fav.id !== propertyId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  },

  // Check if property is favorited
  isFavorited(propertyId: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const favorites = this.getFavorites();
      return favorites.some((fav) => fav.id === propertyId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  },

  // Toggle favorite status
  toggleFavorite(property: Property): void {
    if (this.isFavorited(property.id)) {
      this.removeFromFavorites(property.id);
    } else {
      this.addToFavorites(property);
    }
  },

  // Clear all favorites
  clearFavorites(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  },

  // Migrate favorites to user account (to be implemented later)
  migrateToAccount(userId: string): void {
    // This will be implemented when we add user authentication
    console.log('Migrating favorites for user:', userId);
    // Future implementation: Send favorites to backend and associate with user account
  },
};
