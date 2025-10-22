// lib/auth-mock.ts
// Temporary mock authentication until NextAuth issue is resolved

interface MockSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  expires: string;
}

export const auth = async (): Promise<MockSession> => {
  return {
    user: null, // Change to null for now to avoid type issues
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
};

export const signIn = async (provider?: string) => {
  console.log(`Mock sign in with ${provider || 'unknown provider'}`);
  return { ok: true, error: null };
};

export const signOut = async () => {
  console.log('Mock sign out');
  return { ok: true };
};

export const handlers = {
  GET: () => {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  },
  POST: () => {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

// Mock user storage (in real app, this would be in database)
const mockUser = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  role: null as string | null,
  profileType: null as string | null, // Add profile type to match our schema
};

export const mockUpdateUserRole = async (role: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  mockUser.role = role;
  console.log(`Mock: Updated user role to ${role}`);

  return { success: true, user: mockUser };
};

// Add this function for profile updates matching our schema
export const mockUpdateUserProfile = async (profileType: 'tenant' | 'landlord' | 'agent') => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  mockUser.profileType = profileType;
  console.log(`Mock: Updated user profile type to ${profileType}`);

  return { success: true, user: mockUser };
};

export const getMockUser = () => mockUser;
