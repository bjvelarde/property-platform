// Shared types for property-related components
export interface SearchFilters {
  location: string;
  minPrice: number | '';
  maxPrice: number | '';
  bedrooms: number | '';
  propertyType: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  description: string;
  landlordId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}
