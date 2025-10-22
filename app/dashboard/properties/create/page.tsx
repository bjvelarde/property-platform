'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PropertyCreateForm from '../../../../components/property-create-form';
import { roleAcquisition, type UserRoles } from '../../../../lib/role-acquisition';

interface PropertyFormData {
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
  squareFeet: number | '';
  propertyType: string;
}

// Helper function to get initial roles from localStorage
const getInitialRoles = (): UserRoles => {
  if (typeof window === 'undefined') {
    return {
      isProspect: true,
      isTenant: false,
      isLandlord: false,
    };
  }

  const savedRoles = localStorage.getItem('user-roles');
  if (savedRoles) {
    return JSON.parse(savedRoles);
  }

  return {
    isProspect: true,
    isTenant: false,
    isLandlord: false,
  };
};

export default function CreatePropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize state directly instead of using effect
  const [userRoles, setUserRoles] = useState<UserRoles>(getInitialRoles);

  const handleSubmit = async (formData: PropertyFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call to create property
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Creating property:', formData);

      // Acquire landlord role upon successful property creation
      const newRoles = roleAcquisition.acquireLandlordRole(userRoles);
      setUserRoles(newRoles);

      // Update localStorage
      localStorage.setItem('user-roles', JSON.stringify(newRoles));

      // Show success message
      alert('Property listed successfully! You are now a landlord on the platform.');

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Error creating property. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">List Your Property</h1>
              <p className="text-sm text-gray-600 mt-1">
                {!userRoles.isLandlord
                  ? 'Become a landlord by listing your first property'
                  : 'Add another property to your portfolio'}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              {roleAcquisition.getActiveRoles(userRoles).join(' • ')}
            </div>
          </div>
        </div>
      </header>

      {/* Role Acquisition Banner */}
      {!userRoles.isLandlord && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    New Role
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">
                    <strong>You&apos;re about to become a landlord!</strong> Listing your first
                    property will automatically grant you landlord privileges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        <PropertyCreateForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
      </main>
    </div>
  );
}
