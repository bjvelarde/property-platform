import type { SearchFilters, Property } from './property-types';

// Re-export Property type for convenience
export type { Property };

// Temporary mock data until we connect to Supabase
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    price: 3200,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    description:
      'Beautiful modern apartment in the heart of downtown with amazing city views. Features stainless steel appliances, hardwood floors, and in-unit laundry.',
    landlordId: 'landlord-1',
    isPublished: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Cozy Garden Studio',
    address: '456 Oak Ave',
    city: 'Berkeley',
    state: 'CA',
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    description:
      'Charming studio with private garden, perfect for students or young professionals. Quiet neighborhood with easy access to public transportation.',
    landlordId: 'landlord-2',
    isPublished: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Luxury High-Rise Condo',
    address: '789 Market St',
    city: 'San Francisco',
    state: 'CA',
    price: 4500,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop',
    description:
      'Spacious luxury condo with panoramic bay views and premium amenities including gym, pool, and 24/7 concierge service.',
    landlordId: 'landlord-3',
    isPublished: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Sunny Mission District Flat',
    address: '321 Valencia St',
    city: 'San Francisco',
    state: 'CA',
    price: 2800,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 800,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    description:
      'Bright and airy flat in the vibrant Mission District. Walking distance to restaurants, cafes, and public transportation.',
    landlordId: 'landlord-4',
    isPublished: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    isFavorite: false,
  },
];

export const getMockProperties = (filters?: Partial<SearchFilters>): Property[] => {
  let filtered = [...mockProperties];

  // Safe location filter with optional chaining
  if (filters?.location) {
    const location = filters.location.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.city.toLowerCase().includes(location) ||
        p.state.toLowerCase().includes(location) ||
        p.address.toLowerCase().includes(location)
    );
  }

  // Safe minPrice filter - check if it's a number (not empty string)
  if (filters?.minPrice !== undefined && filters.minPrice !== '') {
    const minPrice = filters.minPrice;
    filtered = filtered.filter((p) => p.price >= minPrice);
  }

  // Safe maxPrice filter - check if it's a number (not empty string)
  if (filters?.maxPrice !== undefined && filters.maxPrice !== '') {
    const maxPrice = filters.maxPrice;
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  // Safe bedrooms filter - check if it's a number (not empty string)
  if (filters?.bedrooms !== undefined && filters.bedrooms !== '') {
    const bedrooms = filters.bedrooms;
    filtered = filtered.filter((p) => p.bedrooms >= bedrooms);
  }

  // Safe propertyType filter with optional chaining
  if (filters?.propertyType) {
    const type = filters.propertyType.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(type) ||
        (type === 'apartment' && p.title.toLowerCase().includes('apartment')) ||
        (type === 'house' && p.title.toLowerCase().includes('house')) ||
        (type === 'condo' && p.title.toLowerCase().includes('condo')) ||
        (type === 'townhouse' && p.title.toLowerCase().includes('townhouse'))
    );
  }

  return filtered;
};
