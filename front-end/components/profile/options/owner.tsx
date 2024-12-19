import UserService from "@/services/UserService";
import { Address, Role } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import { Section } from "lucide-react";
import { useEffect, useState } from "react";

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

const Owner: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const roles = ["Admin", "Owner", "User"];
    const [currentUserId, setCurrentUserId] = useState<number>();

    const getAllUsers = async () => {
        try {
            const users = await UserService.getAllUsers();
            users.sort()
            setUsers(users);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        const fetchToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode<ProfileProps>(token);
                if (decoded && decoded.userId) {
                    setCurrentUserId(decoded.userId);
                }
            }
        }
        fetchToken()
    }, [])

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleChange = (userId: number, newRole: Role) => {
        if (userId === currentUserId) {
            const confirmChange = window.confirm("Are you sure you want to change your own role? You will lose access to this page.");
            if (!confirmChange) {
                return;
            }
        }
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );

        try {
            UserService.updateUserRole(userId, newRole)
            console.log(`Role updated for user ${userId}`)
        } catch (error) {
            console.log(`Failed to update role for ${userId}: ${error}`)
        }
    };

    return (
        <>
            <div className="w-full flex flex-col gap-3">
                {users.map((user) =>
                    <section
                        className="flex rounded justify-between bg-white shadow-md py-2 px-2"
                        key={user.id}>
                        <p>{user.name}</p>
                        <div className="flex gap-5">
                            <select
                                value={user.role || "Role not found"}
                                onChange={(e) => handleChange(user.id, e.target.value as Role)}
                                className="ml-2 p-1 rounded-lg bg-transparent text-black border-black border-2"
                            >
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </section>
                )}
            </div>
        </>


    );
};

export default Owner;
