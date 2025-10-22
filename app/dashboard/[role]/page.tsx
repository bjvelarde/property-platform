import { notFound } from 'next/navigation'

interface DashboardPageProps {
    params: Promise<{
        role: string
    }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    // Await the params since they're now async in Next.js 15
    const { role } = await params

    if (!['tenant', 'landlord', 'agent'].includes(role)) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 capitalize">
                    {role} Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                    Welcome to your {role} dashboard! This is a placeholder - real content coming soon.
                </p>

                <div className="mt-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-600">Properties</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-600">Messages</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm text-purple-600">Tasks</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}