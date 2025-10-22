import { Building, Search, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">PropertyPlatform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/properties"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Browse Properties
              </Link>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Journey in Property Management
            <span className="block text-blue-600">Starts Here</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            No complicated decisions. Start as a prospect and naturally become a tenant, landlord, or both through your actions on the platform.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Find Rental Path */}
            <Link
              href="/properties"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-200 transition-colors">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find a Rental</h3>
              <p className="text-gray-600 mb-6">
                Browse available properties and find your perfect home. Become a tenant when you sign your first lease.
              </p>
              <div className="flex items-center justify-center text-blue-600 font-semibold">
                Start Browsing
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* List Property Path */}
            <Link
              href="/dashboard/properties/create"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                <Plus className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">List Your Property</h3>
              <p className="text-gray-600 mb-6">
                Become a landlord by listing your property. Automatically gain landlord privileges when you create your first listing.
              </p>
              <div className="flex items-center justify-center text-green-600 font-semibold">
                Start Listing
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Unified Dashboard */}
            <Link
              href="/dashboard"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 group border-2 border-purple-200"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-200 transition-colors">
                <Building className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unified Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Manage everything in one place. Your dashboard adapts to your roles and shows only what you need.
              </p>
              <div className="flex items-center justify-center text-purple-600 font-semibold">
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Architecture Explanation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Our Platform Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Start as Prospect</h3>
                <p className="text-gray-600">
                  Everyone begins exploring without any role decisions. Browse properties and discover features naturally.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Acquire Roles Through Actions</h3>
                <p className="text-gray-600">
                  Become a tenant by signing a lease. Become a landlord by listing a property. No upfront decisions required.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Enjoy Multi-Role Benefits</h3>
                <p className="text-gray-600">
                  Be both a tenant and landlord simultaneously. Your dashboard adapts to show all relevant features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>PropertyPlatform &copy; 2024 - Simplifying property management through action-based roles</p>
          </div>
        </div>
      </footer>
    </div>
  );
}