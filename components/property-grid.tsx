import type { Property } from '../lib/property-types';

import PropertyCard from './property-card';

interface PropertyGridProps {
  properties: Property[];
  onPropertyClick: (propertyId: string) => void;
  onFavoriteToggle: (propertyId: string) => void;
  isLoading?: boolean;
  emptyStateMessage?: string;
}

export default function PropertyGrid({
  properties,
  onPropertyClick,
  onFavoriteToggle,
  isLoading = false,
  emptyStateMessage = 'No properties found matching your criteria.',
}: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-10 bg-gray-300 rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
        <p className="text-gray-600 max-w-md mx-auto">{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onFavoriteToggle={onFavoriteToggle}
          onClick={onPropertyClick}
        />
      ))}
    </div>
  );
}
