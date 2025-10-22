// components/auth/role-selection.tsx
'use client';

import { Home, Building2, UserCheck, Check } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ROLES = [
  {
    id: 'tenant' as const,
    title: 'Tenant',
    description: 'Looking to rent a property',
    icon: Home,
    features: ['Search properties', 'Save favorites', 'Contact landlords', 'Manage applications'],
    color: 'blue',
  },
  {
    id: 'landlord' as const,
    title: 'Landlord',
    description: 'Own properties to rent out',
    icon: Building2,
    features: ['List properties', 'Manage tenants', 'Track payments', 'Handle maintenance'],
    color: 'green',
  },
  {
    id: 'agent' as const,
    title: 'Agent',
    description: 'Help connect tenants with properties',
    icon: UserCheck,
    features: ['Show properties', 'Client management', 'Commission tracking', 'Market analysis'],
    color: 'purple',
  },
];

interface RoleSelectionProps {
  onRoleSelect: (role: 'tenant' | 'landlord' | 'agent') => void;
  isLoading?: boolean;
}

export function RoleSelection({ onRoleSelect, isLoading = false }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'tenant' | 'landlord' | 'agent' | null>(null);

  const handleRoleSelect = (role: 'tenant' | 'landlord' | 'agent') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Role</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select how you plan to use PropertyPlatform. You can always add more roles later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ROLES.map((role) => (
          <Card
            key={role.id}
            className={`cursor-pointer transition-all ${
              selectedRole === role.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <CardHeader className="text-center">
              <div
                className={`w-12 h-12 rounded-full bg-${role.color}-100 flex items-center justify-center mx-auto mb-4`}
              >
                <role.icon className={`w-6 h-6 text-${role.color}-600`} />
              </div>
              <CardTitle className="flex items-center justify-center gap-2">
                {role.title}
                {selectedRole === role.id && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Check className="w-3 h-3 mr-1" />
                    Selected
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm">
                {role.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedRole || isLoading}
          className="min-w-32"
        >
          {isLoading ? 'Creating Profile...' : 'Continue'}
        </Button>

        {!selectedRole && (
          <p className="text-sm text-gray-500 mt-2">Please select a role to continue</p>
        )}
      </div>
    </div>
  );
}
