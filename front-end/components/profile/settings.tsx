import { i18n, useTranslation } from "next-i18next";
import Language from "../language/Language";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Address, Role } from "@/types/types";
import AnimatedCheckbox from "../register/AnimatedCheckbox";
import { House } from "lucide-react";


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


const Settings: React.FC = () => {
    const { t } = useTranslation();
    const [userId, setUserId] = useState<number>()
    const [user, setUser] = useState<any>(null);
    const [seller, setSeller] = useState<boolean>(false);

    const fetchUser = async (userId: number) => {
        try {
            const user = await UserService.getUser(userId);
            setUser(user);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode<ProfileProps>(token);
                if (decoded && decoded.userId) {
                    setUserId(decoded.userId);
                    fetchUser(decoded.userId);
                }
            }
        }
        fetchToken()
    }, [])

    useEffect(() => {
        if (user !== null) {
            setSeller(user.seller);
            console.log(user.seller);
        }
    }, [user]);

    const updateSeller = () => {} // here to satisfy the requirment to have an onchange function in the animatedCheckbox, does nothing

    return (
        <div className="flex flex-col max-h-fit h-screen">
            <div onClick={() => window.location.href = '/'} className='absolute top-5 right-5 hover:cursor-pointer'><House /></div>
            <div className="flex-grow">
                <div className="flex flex-row items-center">{t('language')}: <Language /></div>
                <div className="flex flex-row items-center gap-2 pt-2 pointer-events-none">
                    {t("register.seller")} <span className="bg-transparent">*</span>
                    <AnimatedCheckbox
                        label={""}
                        name="seller"
                        onchange={() => updateSeller()}
                        checked={seller}
                    />
                </div>
            </div>
            <footer className="mt-20 absolute bottom-0 left-0 text-gray-600">
                * It is not possible to either attain or relinquish seller status. Please contact customer support to change your status.
            </footer>
        </div>
    )
};

export default Settings;
