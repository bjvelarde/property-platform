import { FileText, Calendar, User, X, Check } from 'lucide-react';
import { useState } from 'react';

interface LeaseFormData {
  fullName: string;
  email: string;
  phone: string;
  moveInDate: string;
  leaseDuration: string;
  agreedToTerms: boolean;
}

interface LeaseSigningFormProps {
  property: {
    id: string;
    title: string;
    price: number;
    address: string;
  };
  onSignLease: (leaseData: LeaseFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function LeaseSigningForm({
  property,
  onSignLease,
  onCancel,
  isLoading = false,
}: LeaseSigningFormProps) {
  const [formData, setFormData] = useState<LeaseFormData>({
    fullName: '',
    email: '',
    phone: '',
    moveInDate: '',
    leaseDuration: '12',
    agreedToTerms: false,
  });

  const handleInputChange = (field: keyof LeaseFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignLease(formData);
  };

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.moveInDate &&
    formData.agreedToTerms;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-6">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Sign Lease Agreement</h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Property Summary */}
        <div className="bg-blue-50 border-b border-blue-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Property:</span> {property.title}
            </div>
            <div>
              <span className="font-medium">Address:</span> {property.address}
            </div>
            <div>
              <span className="font-medium">Monthly Rent:</span> {formatPrice(property.price)}
            </div>
            <div>
              <span className="font-medium">Lease Duration:</span> {formData.leaseDuration} months
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Lease Terms */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Lease Terms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="moveInDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Move-In Date *
                </label>
                <input
                  type="date"
                  id="moveInDate"
                  value={formData.moveInDate}
                  onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="leaseDuration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lease Duration *
                </label>
                <select
                  id="leaseDuration"
                  value={formData.leaseDuration}
                  onChange={(e) => handleInputChange('leaseDuration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
                I agree to the terms and conditions of the lease agreement. I understand that
                signing this lease will make me a tenant on the platform and grant me access to
                tenant features like rent payments and maintenance requests.
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Sign Lease & Become Tenant
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
