import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { id } from 'date-fns/locale';

const prisma = new PrismaClient();

const main = async () => {
    // Delete data in the reverse order of dependency to avoid conflicts
    await prisma.review.deleteMany();
    await prisma.productCatalog.deleteMany();
    await prisma.product.deleteMany();
    await prisma.shoppingCart.deleteMany();
    await prisma.user.deleteMany();
    await prisma.address.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();

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

    const passwordJhon = await bcrypt.hash('XX', 12);

    const John = await prisma.user.create({
        data: {
            name: 'Jhon Doe',
            phoneNumber: '+32 123 45 67 89',
            emailAddress: 'jhon@iets.be',
            password: passwordJhon,
            seller: true,
            newsLetter: true,
            role: 'Owner',
            address: {
                connect: { id: addressJhon.id },
            },
        },
    });

    const passwordJane = await bcrypt.hash('Something_secure', 12);

    const Jane = await prisma.user.create({
        data: {
            name: 'Jane Toe',
            phoneNumber: '+32 400 85 96 91',
            emailAddress: 'Jane.Toe@gmail.com',
            password: passwordJane,
            seller: true,
            newsLetter: true,
            role: 'User',
            address: {
                connect: { id: addressJane.id },
            },
        },
    });

    const passwordMike = await bcrypt.hash('SecurePassword123', 12);

    const Mike = await prisma.user.create({
        data: {
            name: 'Mike Smith',
            phoneNumber: '+32 234 56 78 90',
            emailAddress: 'mike.smith@domain.com',
            password: passwordMike,
            seller: false,
            newsLetter: false,
            role: 'User',
            address: {
                connect: { id: addressMike.id },
            },
        },
    });


    const passwordEmily = await bcrypt.hash('SuperSecretPassword', 12);

    const Emily = await prisma.user.create({
        data: {
            name: 'Emily White',
            phoneNumber: '+32 499 22 33 44',
            emailAddress: 'emily.white@domain.com',
            password: passwordEmily,
            seller: true,
            newsLetter: false,
            role: 'Admin',
            address: {
                connect: { id: addressEmily.id },
            },
        },
    });

    const product1Emily = await prisma.product.create({
        data: {
            name: 'JBL Headphones',
            description: 'Noise-cancelling over-ear headphones',
            media: '/productPictures/jbl.png',
            stock: 50,
            price: 199,
            details: 'Wireless, 20 hours battery life',
        },
    });

    const product2Emily = await prisma.product.create({
        data: {
            name: 'Samsung QLED TV',
            description: 'Smart TV with Quantum Dot technology',
            media: '/productPictures/SamsungQled.jpg',
            stock: 10,
            price: 1499,
            details: '65-inch, 4K UHD, HDR',
        },
    });


    const passwordChris = await bcrypt.hash('AnotherSecurePassword', 10);

    const Chris = await prisma.user.create({
        data: {
            name: 'Chris Brown',
            phoneNumber: '+32 488 77 66 55',
            emailAddress: 'chris.brown@domain.com',
            password: passwordChris,
            seller: false,
            newsLetter: true,
            role: 'User',
            address: {
                connect: { id: addressChris.id },
            },
        },
    });

    const product1Chris = await prisma.product.create({
        data: {
            name: 'JBL Headphones',
            description: 'Noise-cancelling over-ear headphones',
            media: '/productPictures/jbl.png',
            stock: 50,
            price: 199,
            details: 'Wireless, 20 hours battery life',
        },
    });

    // Create Products
    const products = [
        {
            name: 'JBL Headphones',
            description: 'Noise-cancelling over-ear headphones',
            media: '/productPictures/jbl.png',
            stock: 50,
            price: 199,
            details: 'Wireless, 20 hours battery life',
        },
        {
            name: 'Apple iPhone 13',
            description: 'Latest model of the iPhone series',
            media: '/productPictures/iphone.jpg',
            stock: 30,
            price: 999,
            details: '128GB, Black',
        },
        {
            name: 'Samsung Galaxy S21',
            description: 'Flagship smartphone from Samsung',
            media: '/productPictures/samsung21.jpg',
            stock: 40,
            price: 799,
            details: '256GB, Silver',
        },
        {
            name: 'Sony WH-1000XM4',
            description: 'Industry-leading noise canceling with Dual Noise Sensor technology',
            media: '/productPictures/SonyWH.png',
            stock: 25,
            price: 349,
            details: '30 hours battery life, touch sensor controls',
        },
        {
            name: 'Dell XPS 13',
            description: 'High-performance laptop with InfinityEdge display',
            media: '/productPictures/Dell_XPS_13.png',
            stock: 15,
            price: 1199,
            details: '13.4-inch FHD+, Intel Core i7, 16GB RAM, 512GB SSD',
        },
        {
            name: 'Google Pixel 6',
            description: "Google's latest smartphone with advanced AI features",
            media: '/productPictures/Pixel6.png',
            stock: 35,
            price: 699,
            details: '128GB, Stormy Black',
        },
        {
            name: 'Amazon Echo Dot',
            description: 'Smart speaker with Alexa',
            media: '/productPictures/echo.png',
            stock: 100,
            price: 49,
            details: '4th Gen, Charcoal',
        },
        {
            name: 'Apple MacBook Pro',
            description: 'Powerful laptop with M1 chip',
            media: '/productPictures/macbook.png',
            stock: 20,
            price: 1299,
            details: '13-inch, 8GB RAM, 256GB SSD',
        },
        {
            name: 'Samsung QLED TV',
            description: 'Smart TV with Quantum Dot technology',
            media: '/productPictures/SamsungQled.jpg',
            stock: 10,
            price: 1499,
            details: '65-inch, 4K UHD, HDR',
        },
        {
            name: 'Bose QuietComfort 35 II',
            description: 'Wireless Bluetooth headphones',
            media: '/productPictures/BoseQuietComfort.jpg',
            stock: 45,
            price: 299,
            details: 'Noise-cancelling, Alexa voice control',
        },
        {
            name: 'Fitbit Charge 5',
            description: 'Advanced fitness and health tracker',
            media: '/productPictures/fitbitCharge5.png',
            stock: 60,
            price: 179,
            details: 'Built-in GPS, stress management tools',
        },
        {
            name: 'Microsoft Surface Pro 7',
            description: 'Versatile 2-in-1 laptop',
            media: '/productPictures/MicrosoftSurfacePro7.jpg',
            stock: 25,
            price: 899,
            details: '12.3-inch, Intel Core i5, 8GB RAM, 128GB SSD',
        },
        {
            name: 'Nintendo Switch',
            description: 'Hybrid gaming console',
            media: '/productPictures/NintendoSwitch.jpg',
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
