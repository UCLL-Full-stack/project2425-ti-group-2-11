import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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
            state: "Leuven",
            postalCode: "3000",
            country: "Belgium"
        }
    });

    // Create User with Address connection
    await prisma.user.create({
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
            }
        }
    });
};

(async () => {
    try {
        await main()
        await prisma.$disconnect()
    } catch (error) {
        console.error("Error:", error);
        await prisma.$disconnect()
        process.exit(1)
    }
})();
