import { User, Settings, FileText, ShoppingBag, LogOut, House } from 'lucide-react'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Overview from './overview';
import Setting from './settings'
import Bills from './bills';
import Orders from './orders';
import { useTranslation } from 'next-i18next';


const Selector: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [selectedOption, setSelectedOptions] = useState<String>('overview')
    const { t } = useTranslation()

    const router = useRouter();

    const navItems = [
        { name: `${t('overview')}`, icon: User, id: 'overview' },
        { name: `${t('settings')}`, icon: Settings, id: 'settings' },
        { name: `${t('bills')}`, icon: FileText, id: 'bills' },
        { name: `${t('orders')}`, icon: ShoppingBag, id: 'orders' },
    ]

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/')
    }

    const renderOptions = () => {
        switch (selectedOption) {
            case "overview":
                return <Overview />;
            case "settings":
                return <Setting />;
            case "bills":
                return <Bills />;
            case "orders":
                return <Orders />;
        }
    }

    return (
        <>
            <div className='w-full bg-card text-card-foreground p-4 space-y-2 border-r relative'>
                <div className='space-y-2'>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className="w-full flex items-center justify-start hover:bg-blue-300 pt-2 pb-2 pl-2 rounded-md"
                            onClick={() => setSelectedOptions(item.id)}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>
                <div className="absolute top-4 right-4 hover:cursor-pointer" onClick={() => window.location.href = '/'}>
                    <House />
                </div>
                <div className="pt-4 border-t">
                    <button
                        className='text-red-500 flex items-center hover:bg-red-300 hover:text-red-600 w-full pl-2 pt-2 pb-2 rounded-md'
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
                <div>
                    {renderOptions()}
                </div>
            </div>
        </>
    )
}

export default Selector