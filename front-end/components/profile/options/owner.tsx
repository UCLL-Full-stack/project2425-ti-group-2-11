import UserService from "@/services/UserService";
import { Role } from "@/types/types";
import { useEffect, useState } from "react";

const Owner: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]); // Stores users and roles
    const roles = ["Admin", "Owner", "User"]; // Available roles for selection

    // Fetch all users
    const getAllUsers = async () => {
        try {
            const users = await UserService.getAllUsers();
            setUsers(users);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleChange = (userId: number, newRole: Role) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );

        UserService.updateUserRole(userId, newRole)
            .then(() => console.log(`Role updated for user ${userId}`))
            .catch((error) => console.error("Failed to update role:", error));
    };

    return (
        <div>
            {users.map((user) => (
                <div
                    key={user.id}
                    className="grid grid-cols-2 items-center gap-2 max-w-80"
                >
                    <p className="pb-2">{user.name}</p>

                    <select
                        value={user.role || "Role not found"}
                        onChange={(e) => handleChange(user.id, e.target.value as Role)}
                        className="border p-2 rounded-lg"
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
