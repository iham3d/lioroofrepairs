import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/utils';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Honeypot check - if filled, it's a bot
        if (body.honeypot) {
            return NextResponse.json(
                { error: 'Invalid submission' },
                { status: 400 }
            );
        }

        // Validate input
        const validatedData = contactSchema.parse(body);

        // Rate limiting
        const clientIp = getClientIp(request.headers) || 'unknown';
        if (!checkRateLimit(clientIp, 3, 60 * 60 * 1000)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Save to database
        const submission = await prisma.contactSubmission.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone || null,
                message: validatedData.message,
                ipAddress: clientIp,
                userAgent: request.headers.get('user-agent') || null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for your message. We will get back to you soon!',
                id: submission.id,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
