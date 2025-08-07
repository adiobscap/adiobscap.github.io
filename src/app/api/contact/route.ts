import { NextRequest, NextResponse } from 'next/server';
import { insertContact, type ContactSubmission } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body: ContactSubmission = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = insertContact(body);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: result.lastInsertRowid 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}