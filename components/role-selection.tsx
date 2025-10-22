'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockUpdateUserRole } from '@/lib/auth-mock'

type UserRole = 'tenant' | 'landlord' | 'agent'

const ROLES = [
    {
        id: 'tenant' as UserRole,
        title: 'Tenant',
        description: 'Looking for your next rental property',
        icon: '🏠',
        features: ['Search properties', 'Save favorites', 'Contact landlords', 'Schedule viewings']
    },
    {
        id: 'landlord' as UserRole,
        title: 'Landlord',
        description: 'Manage your rental properties',
        icon: '👔',
        features: ['List properties', 'Manage tenants', 'Track payments', 'Handle maintenance']
    },
    {
        id: 'agent' as UserRole,
        title: 'Real Estate Agent',
        description: 'Connect landlords with tenants',
        icon: '🤝',
        features: ['Market properties', 'Coordinate viewings', 'Negotiate contracts', 'Earn commissions']
    }
]

export default function RoleSelection() {
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleRoleSelect = async (role: UserRole) => {
        setIsLoading(true)
        try {
            // Update user role in our mock auth system
            await mockUpdateUserRole(role)

            // Redirect to appropriate dashboard
            router.push(`/dashboard/${role}`)
        } catch (error) {
            console.error('Error selecting role:', error)
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Choose Your Role
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Select how you&apos;d like to use our platform. You can always change this later in your settings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ROLES.map((role) => (
                    <Card
                        key={role.id}
                        className={`cursor-pointer transition-all duration-200 ${selectedRole === role.id
                                ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                                : 'hover:shadow-md hover:scale-102'
                            }`}
                        onClick={() => setSelectedRole(role.id)}
                    >
                        <CardHeader className="text-center">
                            <div className="text-4xl mb-2">{role.icon}</div>
                            <CardTitle className="text-xl">{role.title}</CardTitle>
                            <CardDescription className="text-sm h-12 flex items-center justify-center">
                                {role.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
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
                                variant={selectedRole === role.id ? "default" : "outline"}
                                onClick={() => handleRoleSelect(role.id)}
                                disabled={isLoading || selectedRole !== role.id}
                            >
                                {isLoading && selectedRole === role.id ? (
                                    <>Selecting...</>
                                ) : (
                                    <>Select {role.title}</>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {selectedRole && (
                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        Selected: <span className="font-semibold text-gray-900">
                            {ROLES.find(r => r.id === selectedRole)?.title}
                        </span>
                    </p>
                </div>
            )}
        </div>
    )
}