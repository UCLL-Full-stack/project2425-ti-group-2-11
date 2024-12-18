import { useTranslation } from "next-i18next";
import Language from "../language/Language";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Address, Role } from "@/types/types";
import AnimatedCheckbox from "../register/AnimatedCheckbox";


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

    const updateSeller = () => {}

    return (
        <>
            <div className="flex flex-row items-center">{t('language')}: <Language /></div>
            <div className="flex flex-row items-center gap-2 pt-2">
            {t("register.sellercheckbox")}
            <AnimatedCheckbox
                label={""}
                name="seller"
                onchange={() => updateSeller()}
                checked={seller}
            />
            </div>
        </>
    )
};

export default Settings;
