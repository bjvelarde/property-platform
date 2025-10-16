import { TestAuth } from '@/components/test-auth';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to PropertyPlatform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The modern property management platform with AI-powered features.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <TestAuth />
        </div>
      </div>
    </div>
  );
}