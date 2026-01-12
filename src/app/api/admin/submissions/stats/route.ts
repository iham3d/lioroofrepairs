import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get counts by status
        const [total, newCount, contactedCount, completedCount] = await Promise.all([
            prisma.contactSubmission.count(),
            prisma.contactSubmission.count({ where: { status: 'NEW' } }),
            prisma.contactSubmission.count({ where: { status: 'CONTACTED' } }),
            prisma.contactSubmission.count({ where: { status: 'COMPLETED' } }),
        ]);

        return NextResponse.json({
            total,
            new: newCount,
            contacted: contactedCount,
            completed: completedCount,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
