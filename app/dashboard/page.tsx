'use client';

import { Building, Home, Search, Plus, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { roleAcquisition, type UserRoles } from '../../lib/role-acquisition';

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

export default function Dashboard() {
  // Initialize state directly instead of using effect
  const [userRoles] = useState<UserRoles>(getInitialRoles);

  const activeRoles = roleAcquisition.getActiveRoles(userRoles);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">PropertyPlatform</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Role Badges */}
              <div className="flex items-center space-x-2">
                {activeRoles.map((role) => (
                  <span
                    key={role}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      role === 'Landlord'
                        ? 'bg-green-100 text-green-800'
                        : role === 'Tenant'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {role}
                    {role !== 'Prospect' && <BadgeCheck className="h-3 w-3 ml-1" />}
                  </span>
                ))}
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">
            {userRoles.isProspect && !userRoles.isTenant && !userRoles.isLandlord
              ? 'Start your journey by exploring rental properties or listing your own.'
              : 'Manage your properties and rentals in one place.'}
          </p>
        </div>

        {/* Primary Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Find Rental */}
          <Link
            href="/properties"
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Find a Rental</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Browse available rental properties and find your perfect home.
            </p>
            {userRoles.isTenant && (
              <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <BadgeCheck className="h-3 w-3 mr-1" />
                Tenant Access
              </div>
            )}
          </Link>

          {/* List Property */}
          <Link
            href="/dashboard/properties/create"
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">List Your Property</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Become a landlord by listing your property for rent.
            </p>
            {userRoles.isLandlord && (
              <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <BadgeCheck className="h-3 w-3 mr-1" />
                Landlord Access
              </div>
            )}
          </Link>

          {/* Find Manager */}
          <Link
            href="/managers"
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Find Managers</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Hire professional property managers for your rental properties.
            </p>
            {userRoles.isLandlord && (
              <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <BadgeCheck className="h-3 w-3 mr-1" />
                For Landlords
              </div>
            )}
          </Link>
        </div>

        {/* Role-Based Sections */}
        <div className="space-y-8">
          {/* My Rentals Section (Tenant Role) */}
          {userRoles.isTenant && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-blue-600" />
                  My Rentals
                </h3>
                <Link
                  href="/dashboard/rentals"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="text-center py-8">
                <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You don&apos;t have any active rentals yet.</p>
                <Link
                  href="/properties"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Rentals
                </Link>
              </div>
            </section>
          )}

          {/* My Properties Section (Landlord Role) */}
          {userRoles.isLandlord && (
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-green-600" />
                  My Properties
                </h3>
                <Link
                  href="/dashboard/properties"
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="text-center py-8">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You haven&apos;t listed any properties yet.</p>
                <Link
                  href="/dashboard/properties/create"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  List Property
                </Link>
              </div>
            </section>
          )}

          {/* Prospect Empty State */}
          {userRoles.isProspect && !userRoles.isTenant && !userRoles.isLandlord && (
            <section className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Journey</h3>
                <p className="text-gray-600 mb-6">
                  You&apos;re currently exploring as a prospect. Choose a path to get started:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/properties"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Rental Properties
                  </Link>
                  <Link
                    href="/dashboard/properties/create"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    List Your Property
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Multi-Role Celebration */}
          {roleAcquisition.hasMultipleRoles(userRoles) && (
            <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-center">
                <BadgeCheck className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    You&apos;re a Multi-Role User!
                  </h3>
                  <p className="text-gray-600">
                    You have access to both tenant and landlord features. You can rent properties
                    while managing your own listings.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
