'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { mockUpdateUserProfile } from '@/lib/auth-mock';

type UserRole = 'tenant' | 'landlord' | 'agent';

const ROLES = [
  {
    id: 'tenant' as UserRole,
    title: 'Looking for a Rental',
    description: 'Search and apply for rental properties',
    icon: '🔍',
    features: [
      'Browse properties',
      'Save favorites',
      'Contact landlords',
      'Submit applications',
      'Schedule viewings',
    ],
    userType: 'Prospect/Tenant',
  },
  {
    id: 'landlord' as UserRole,
    title: 'Property Owner',
    description: 'List and manage your rental properties',
    icon: '🏠',
    features: [
      'List properties',
      'Screen tenants',
      'Collect rent',
      'Manage maintenance',
      'Handle applications',
    ],
    userType: 'Landlord',
  },
  {
    id: 'agent' as UserRole,
    title: 'Property Manager',
    description: 'Manage properties for multiple owners',
    icon: '👔',
    features: [
      'Manage multiple properties',
      'Coordinate maintenance',
      'Handle tenant communications',
      'Financial reporting',
      'Professional services',
    ],
    userType: 'Property Manager',
  },
];

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Card = ({ children, className = '', ...props }: CardProps) => (
  <div className={`border rounded-lg p-6 bg-white ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, variant = 'default', ...props }: ButtonProps) => (
  <button
    className={`px-4 py-2 rounded-md ${
      variant === 'default'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
    } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
    {...props}
  >
    {children}
  </button>
);

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRoleSelect = async (role: UserRole) => {
    setIsLoading(true);
    try {
      // Update user profile with selected role type - using the imported function
      await mockUpdateUserProfile(role);

      // Redirect to appropriate dashboard
      if (role === 'tenant') {
        router.push('/dashboard/tenant');
      } else if (role === 'landlord') {
        router.push('/dashboard/landlord');
      } else if (role === 'agent') {
        router.push('/dashboard/manager');
      }
    } catch (error) {
      console.error('Error selecting role:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How will you use PropertyPlatform?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose how you&apos;d like to get started. You can always update your profile later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROLES.map((role) => (
          <Card
            key={role.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedRole === role.id
                ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                : 'hover:shadow-md hover:scale-102'
            }`}
            onClick={() => setSelectedRole(role.id)}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{role.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
              <p className="text-sm text-blue-600 font-medium mt-1">{role.userType}</p>
              <p className="text-gray-600 text-sm mt-2 min-h-12">{role.description}</p>
            </div>

            <ul className="space-y-2 mb-6">
              {role.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={selectedRole === role.id ? 'default' : 'outline'}
              onClick={() => handleRoleSelect(role.id)}
              disabled={isLoading || selectedRole !== role.id}
            >
              {isLoading && selectedRole === role.id ? (
                <>Getting Started...</>
              ) : (
                <>Continue as {role.userType}</>
              )}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Not sure which to choose?</h3>
        <p className="text-gray-600 text-sm">
          <strong>Looking for a rental?</strong> Choose &quot;Looking for a Rental&quot;
          <br />
          <strong>Own property?</strong> Choose &quot;Property Owner&quot;
          <br />
          <strong>Manage properties professionally?</strong> Choose &quot;Property Manager&quot;
        </p>
      </div>

      {selectedRole && (
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Selected:{' '}
            <span className="font-semibold text-gray-900">
              {ROLES.find((r) => r.id === selectedRole)?.userType}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
