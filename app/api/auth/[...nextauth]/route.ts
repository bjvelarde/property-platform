import { NextResponse } from 'next/server';

export async function GET() {
  // Remove unused parameter
  console.log('🔐 Mock auth API called');

  return NextResponse.json({
    user: null,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
}

export async function POST() {
  // Remove unused parameter
  console.log('🔐 Mock auth POST called');

  return NextResponse.json({
    success: true,
    message: 'Mock authentication successful',
  });
}
