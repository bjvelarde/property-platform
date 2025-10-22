import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    console.log('🔐 Mock auth API called')

    // Return mock session data
    return NextResponse.json({
        user: null,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
}

export async function POST(request: NextRequest) {
    console.log('🔐 Mock auth POST called')

    // Simulate successful auth
    return NextResponse.json({
        success: true,
        message: 'Mock authentication successful'
    })
}