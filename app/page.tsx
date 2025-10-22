import { TestAuth } from '@/components/test-auth';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to PropertyPlatform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            The modern property management platform with AI-powered features.
          </p>

          {/* New Call-to-Action Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p className="text-gray-700">Sign In</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <p className="text-gray-700">Choose Your Role</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <p className="text-gray-700">Start Using the Platform</p>
              </div>
            </div>

            <Link
              href="/role-selection"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Choose Your Role & Get Started →
            </Link>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <TestAuth />
        </div>
      </div>
    </div>
  );
}