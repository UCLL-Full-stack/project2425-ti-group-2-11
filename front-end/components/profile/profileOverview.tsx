import { User, Settings, FileText, ShoppingBag, Shield } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Overview from './options/overview';
import Setting from './options/settings';
import Bills from './options/bills';
import Orders from './options/orders';
import { useTranslation } from 'next-i18next';
import UserService from '@/services/UserService';
import { jwtDecode } from 'jwt-decode';
import { Address, Role } from '@/types/types';
import Admin from './options/admin';
import Owner from './options/owner';

interface ProfileProps {
    userId?: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    address: Address;
    seller: boolean;
    newsLetter: boolean;
    role: Role;
}

const Selector: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [selectedOption, setSelectedOptions] = useState<string>('overview');
    const { t } = useTranslation();
    const [userId, setUserId] = useState<number>();
    const [user, setUser] = useState<any>();
    const [admin, setAdmin] = useState<boolean>(false);
    const [owner, setOwner] = useState<boolean>(false);

    const router = useRouter();

    const navItems = [
        { name: `${t('overview')}`, icon: User, id: 'overview', component: <Overview /> },
        { name: `${t('settings')}`, icon: Settings, id: 'settings', component: <Setting /> },
        { name: `${t('bills')}`, icon: FileText, id: 'bills', component: <Bills /> },
        { name: `${t('orders')}`, icon: ShoppingBag, id: 'orders', component: <Orders /> },
    ];

    const adminItem = { name: `${t('Admin Options')}`, icon: Shield, id: 'admin', component: <Admin /> };
    const ownerItem = { name: `${t('Owner Options')}`, icon: Shield, id: 'owner', component: <Owner /> };

    const fetchUser = async (userId: number) => {
        console.log('fetching...')
        try {
            const user = await UserService.getUser(userId);
            console.log('Fetched user:', user);
            setUser(user);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            console.log('fetching token')
            const token = localStorage.getItem('token');
            if (token) {
                console.log('token ' + token)
                const decoded = jwtDecode<ProfileProps>(token);
                if (decoded && decoded.userId) {
                    setUserId(decoded.userId);
                    console.log('Decoded user ID:', decoded.userId);
                    fetchUser(decoded.userId);
                }
            }
        }
        fetchToken()
    }, [])
    const [allNavItems, setAllNavItems] = useState([...navItems]);

    useEffect(() => {
        if (user) {
            console.log('in if')
            let allNavItems = [...navItems];
            if (user.role === "Admin") {
                allNavItems = [...allNavItems, adminItem];
            }
            if (user.role === "Owner") {
                console.log('user is owner')
                allNavItems = [...allNavItems, ownerItem];
                console.log(allNavItems)
            }
            setAllNavItems(allNavItems);
        }
    }, [user]);

    const renderAllOptions = () => {
        const selectedItem = allNavItems.find((item) => item.id === selectedOption);
        return selectedItem ? selectedItem.component : <div>{t('invalid_option')}</div>;
    };

    return (
        <>
            <div className="w-full bg-card text-card-foreground p-4 space-y-2 border-r relative">
                <div className="space-y-2">
                    {allNavItems.map((item) => (
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
                <div className="pt-4 border-t"></div>
                <div>{renderAllOptions()}</div>
            </div>
        </>
    );
};

export default Selector;
