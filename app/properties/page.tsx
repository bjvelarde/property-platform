'use client';

import { useState, useEffect } from 'react';

import ContactLandlordForm from '../../components/contact-landlord-form';
import PropertyDetail from '../../components/property-detail';
import PropertyGrid from '../../components/property-grid';
import PropertySearch from '../../components/property-search';
import { favoritesUtils } from '../../lib/favorites-utils';
import { getMockProperties } from '../../lib/property-mock-data';
import type { Property, SearchFilters } from '../../lib/property-types';
import { roleAcquisition, type UserRoles } from '../../lib/role-acquisition';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<UserRoles>({
    isProspect: true,
    isTenant: false,
    isLandlord: false,
  });

  // Load properties and merge with favorites
  useEffect(() => {
    const loadProperties = () => {
      setIsLoading(true);

      // Get properties from mock data
      const mockProperties = getMockProperties();

      // Merge with favorites data
      const favorites = favoritesUtils.getFavorites();
      const propertiesWithFavorites = mockProperties.map((property) => ({
        ...property,
        isFavorite: favorites.some((fav) => fav.id === property.id),
      }));

      setProperties(propertiesWithFavorites);
      setFilteredProperties(propertiesWithFavorites);
      setIsLoading(false);
    };

    loadProperties();
  }, []);

  // Handle search
  const handleSearch = (filters: SearchFilters) => {
    const filtered = getMockProperties(filters);
    const filteredWithFavorites = filtered.map((property) => ({
      ...property,
      isFavorite: favoritesUtils.isFavorited(property.id),
    }));
    setFilteredProperties(filteredWithFavorites);
  };

  // Handle filters change
  const handleFiltersChange = (filters: SearchFilters) => {
    // Filters are now being used in handleSearch, but we don't need to store them
    // Remove the unused state variable and just pass to search
    handleSearch(filters);
  };

  // Handle property click
  const handlePropertyClick = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setShowPropertyDetail(true);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
      favoritesUtils.toggleFavorite(property);

      // Update local state
      const updatedProperties = properties.map((p) =>
        p.id === propertyId ? { ...p, isFavorite: !p.isFavorite } : p
      );

      setProperties(updatedProperties);
      setFilteredProperties((prev) =>
        prev.map((p) => (p.id === propertyId ? { ...p, isFavorite: !p.isFavorite } : p))
      );

      // Update selected property if it's the one being toggled
      if (selectedProperty?.id === propertyId) {
        setSelectedProperty((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
      }
    }
  };

  // Handle contact landlord
  const handleContactLandlord = () => {
    // For demo purposes, we'll simulate lease signing success
    const newRoles = roleAcquisition.acquireTenantRole(userRoles);
    setUserRoles(newRoles);

    // Save to localStorage (temporary solution)
    localStorage.setItem('user-roles', JSON.stringify(newRoles));

    setShowContactForm(false);
    alert('Lease signed successfully! You are now a tenant on the platform.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Find Properties</h1>
            </div>
            <div className="text-sm text-gray-600">
              {filteredProperties.length} properties found
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <PropertySearch onSearch={handleSearch} onFiltersChange={handleFiltersChange} />

        {/* Properties Grid */}
        <PropertyGrid
          properties={filteredProperties}
          onPropertyClick={handlePropertyClick}
          onFavoriteToggle={handleFavoriteToggle}
          isLoading={isLoading}
        />

        {/* Property Detail Modal */}
        {showPropertyDetail && selectedProperty && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <PropertyDetail
              property={selectedProperty}
              onFavoriteToggle={handleFavoriteToggle}
              onBack={() => setShowPropertyDetail(false)}
              onContactLandlord={() => {
                setShowPropertyDetail(false);
                setShowContactForm(true);
              }}
            />
          </div>
        )}

        {/* Contact Landlord Modal */}
        {showContactForm && selectedProperty && (
          <ContactLandlordForm
            propertyTitle={selectedProperty.title}
            onClose={() => setShowContactForm(false)}
            onSubmit={handleContactLandlord}
          />
        )}
      </main>
    </div>
  );
}
