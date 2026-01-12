import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seed...');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@lioroofrepairs.co.uk';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        const passwordHash = await hash(adminPassword, 12);

        await prisma.user.create({
            data: {
                email: adminEmail,
                passwordHash,
                name: 'Admin',
                role: 'ADMIN',
            },
        });

        console.log(`✓ Admin user created: ${adminEmail}`);
        console.log(`  Password: ${adminPassword}`);
        console.log('  IMPORTANT: Change this password after first login!');
    } else {
        console.log('✓ Admin user already exists');
    }

    console.log('Database seed completed!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
