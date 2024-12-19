import UserService from "@/services/UserService";
import { Address, Role } from "@/types/types";
import { jwtDecode } from "jwt-decode";
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

        UserService.updateUserRole(userId, newRole)
            .then(() => console.log(`Role updated for user ${userId}`))
            .catch((error) => console.error("Failed to update role:", error));

            if (userId === currentUserId) {
                window.location.reload()
            }
    };

    return (
        <div>
            {users.map((user) => (
                <div
                    key={user.id}
                    className="grid grid-cols-2 items-center gap-2 max-w-80 "
                >
                    <p className="pb-2 mt-2">{user.name}</p>

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
            ))}
        </div>
    );
};

export default Owner;
