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
            street: 'Bondgenotenlaan',
            houseNumber: '1',
            city: 'Leuven',
            state: 'Vlaams Brabant',
            postalCode: '3000',
            country: 'Belgium',
        },
    });

    const addressJane = await prisma.address.create({
        data: {
            street: 'Maria Theresistraat',
            houseNumber: '20',
            city: 'Leuven',
            state: 'Vlaams Brabant',
            postalCode: '30000',
            country: 'Belgium',
        },
    });

    const addressMike = await prisma.address.create({
        data: {
            street: 'Naamsestraat',
            houseNumber: '45',
            city: 'Leuven',
            state: 'Vlaams Brabant',
            postalCode: '3000',
            country: 'Belgium',
        },
    });

    const addressEmily = await prisma.address.create({
        data: {
            street: 'Parkstraat',
            houseNumber: '12A',
            city: 'Brussels',
            state: 'Brussels Capital',
            postalCode: '1000',
            country: 'Belgium',
        },
    });

    const addressChris = await prisma.address.create({
        data: {
            street: 'Diestsestraat',
            houseNumber: '58B',
            city: 'Leuven',
            state: 'Vlaams Brabant',
            postalCode: '3000',
            country: 'Belgium',
        },
    });

    const John = await prisma.user.create({
        data: {
            name: 'Jhon Doe',
            phoneNumber: '+32 123 45 67 89',
            emailAddress: 'jhon@iets.be',
            password: 'XX',
            seller: true,
            newsLetter: true,
            role: 'Owner',
            address: {
                connect: { id: addressJhon.id },
            },
        },
    });

    const Jane = await prisma.user.create({
        data: {
            name: 'Jane Toe',
            phoneNumber: '+32 400 85 96 91',
            emailAddress: 'Jane.Toe@gmail.com',
            password: 'Something secure',
            seller: true,
            newsLetter: true,
            role: 'User',
            address: {
                connect: { id: addressJane.id },
            },
        },
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
            },
        },
    });

    const Emily = await prisma.user.create({
        data: {
            name: 'Emily White',
            phoneNumber: '+32 499 22 33 44',
            emailAddress: 'emily.white@domain.com',
            password: 'SuperSecretPassword',
            seller: true,
            newsLetter: false,
            role: 'Admin',
            address: {
                connect: { id: addressEmily.id },
            },
        },
    });

    const Chris = await prisma.user.create({
        data: {
            name: 'Chris Brown',
            phoneNumber: '+32 488 77 66 55',
            emailAddress: 'chris.brown@domain.com',
            password: 'AnotherSecurePassword',
            seller: false,
            newsLetter: true,
            role: 'User',
            address: {
                connect: { id: addressChris.id },
            },
        },
    });
    // Create Products
    const products = [
        {
            name: 'JBL Headphones',
            description: 'Noise-cancelling over-ear headphones',
            media: 'https://placehold.co/600x400?text=JBL+Headphones',
            stock: 50,
            price: 199,
            details: 'Wireless, 20 hours battery life',
        },
        {
            name: 'Apple iPhone 13',
            description: 'Latest model of the iPhone series',
            media: 'https://placehold.co/600x400?text=Apple+Iphone+13',
            stock: 30,
            price: 999,
            details: '128GB, Black',
        },
        {
            name: 'Samsung Galaxy S21',
            description: 'Flagship smartphone from Samsung',
            media: 'https://placehold.co/600x400?text=Samsung+Galaxy+S21',
            stock: 40,
            price: 799,
            details: '256GB, Silver',
        },
        {
            name: 'Sony WH-1000XM4',
            description: 'Industry-leading noise canceling with Dual Noise Sensor technology',
            media: 'https://placehold.co/600x400?text=Sony+WH-1000XM4',
            stock: 25,
            price: 349,
            details: '30 hours battery life, touch sensor controls',
        },
        {
            name: 'Dell XPS 13',
            description: 'High-performance laptop with InfinityEdge display',
            media: 'https://placehold.co/600x400?text=Dell+XPS+13',
            stock: 15,
            price: 1199,
            details: '13.4-inch FHD+, Intel Core i7, 16GB RAM, 512GB SSD',
        },
        {
            name: 'Google Pixel 6',
            description: "Google's latest smartphone with advanced AI features",
            media: 'https://placehold.co/600x400?text=Google+Pixel+6',
            stock: 35,
            price: 699,
            details: '128GB, Stormy Black',
        },
        {
            name: 'Amazon Echo Dot',
            description: 'Smart speaker with Alexa',
            media: 'https://placehold.co/600x400?text=Amazon+Echo+Dot',
            stock: 100,
            price: 49,
            details: '4th Gen, Charcoal',
        },
        {
            name: 'Apple MacBook Pro',
            description: 'Powerful laptop with M1 chip',
            media: 'https://placehold.co/600x400?text=Apple+MacBook+Pro',
            stock: 20,
            price: 1299,
            details: '13-inch, 8GB RAM, 256GB SSD',
        },
        {
            name: 'Samsung QLED TV',
            description: 'Smart TV with Quantum Dot technology',
            media: 'https://placehold.co/600x400?text=Samsung+QLED+TV',
            stock: 10,
            price: 1499,
            details: '65-inch, 4K UHD, HDR',
        },
        {
            name: 'Bose QuietComfort 35 II',
            description: 'Wireless Bluetooth headphones',
            media: 'https://placehold.co/600x400?text=Bose+QuietComfort+35+II',
            stock: 45,
            price: 299,
            details: 'Noise-cancelling, Alexa voice control',
        },
        {
            name: 'Fitbit Charge 5',
            description: 'Advanced fitness and health tracker',
            media: 'https://placehold.co/600x400?text=Fitbit+Charge+5',
            stock: 60,
            price: 179,
            details: 'Built-in GPS, stress management tools',
        },
        {
            name: 'Microsoft Surface Pro 7',
            description: 'Versatile 2-in-1 laptop',
            media: 'https://placehold.co/600x400?text=Microsoft+Surface+Pro+7',
            stock: 25,
            price: 899,
            details: '12.3-inch, Intel Core i5, 8GB RAM, 128GB SSD',
        },
        {
            name: 'Nintendo Switch',
            description: 'Hybrid gaming console',
            media: 'https://placehold.co/600x400?text=Nintendo+Switch',
            stock: 50,
            price: 299,
            details: 'Neon Blue and Red Joy-Con',
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                media: product.media,
                stock: product.stock,
                price: product.price,
                details: product.details,
            },
        });
    }
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
