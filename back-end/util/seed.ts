import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    // Delete data in the reverse order of dependency to avoid conflicts
    await prisma.review.deleteMany();
    await prisma.shoppingCart.deleteMany();
    await prisma.productCatalog.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.address.deleteMany();

    // Create Address
    const addressJhon = await prisma.address.create({
        data: {
            street: "Bondgenotenlaan",
            houseNumber: "1",
            city: "Leuven",
            state: "Vlaams Brabant",
            postalCode: "3000",
            country: "Belgium"
        }
    });

    const addressJane = await prisma.address.create({
        data: {
            street: "Maria Theresistraat",
            houseNumber: "20",
            city: "Leuven",
            state: "Vlaams Brabant",
            postalCode: "30000",
            country: "Belgium"
        }
    });

    const addressMike = await prisma.address.create({
        data: {
            street: "Naamsestraat",
            houseNumber: "45",
            city: "Leuven",
            state: "Vlaams Brabant",
            postalCode: "3000",
            country: "Belgium"
        }
    });

    const addressEmily = await prisma.address.create({
        data: {
            street: "Parkstraat",
            houseNumber: "12A",
            city: "Brussels",
            state: "Brussels Capital",
            postalCode: "1000",
            country: "Belgium"
        }
    });

    const addressChris = await prisma.address.create({
        data: {
            street: "Diestsestraat",
            houseNumber: "58B",
            city: "Leuven",
            state: "Vlaams Brabant",
            postalCode: "3000",
            country: "Belgium"
        }
    });

    const John = await prisma.user.create({
        data: {
            name: 'Jhon Doe',
            phoneNumber: '+32 123 45 67 89',
            emailAddress: 'jhon@iets.be',
            password: 'XX',
            seller: true,
            newsLetter: true,
            role: 'Admin',
            address: {
                connect: { id: addressJhon.id },
            },
        },
    });

    const Jane = await prisma.user.create({
        data: {
            name: "Jane Toe",
            phoneNumber: "+32 400 85 96 91",
            emailAddress: "Jane.Toe@gmail.com",
            password: "Something secure",
            seller: true,
            newsLetter: true,
            role: "User",
            address: {
                connect: { id: addressJane.id },
            }
        }
    });

    const Mike = await prisma.user.create({
        data: {
            name: 'Mike Smith',
            phoneNumber: '+32 234 56 78 90',
            emailAddress: 'mike.smith@domain.com',
            password: 'SecurePassword123',
            seller: false,
            newsLetter: false,
            role: 'User',
            address: {
                connect: { id: addressMike.id },
            }
        }
    });

    const Emily = await prisma.user.create({
        data: {
            name: "Emily White",
            phoneNumber: "+32 499 22 33 44",
            emailAddress: "emily.white@domain.com",
            password: "SuperSecretPassword",
            seller: true,
            newsLetter: false,
            role: "Moderator",
            address: {
                connect: { id: addressEmily.id },
            }
        }
    });

    const Chris = await prisma.user.create({
        data: {
            name: "Chris Brown",
            phoneNumber: "+32 488 77 66 55",
            emailAddress: "chris.brown@domain.com",
            password: "AnotherSecurePassword",
            seller: false,
            newsLetter: true,
            role: "User",
            address: {
                connect: { id: addressChris.id },
            }
        }
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error('Error:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
