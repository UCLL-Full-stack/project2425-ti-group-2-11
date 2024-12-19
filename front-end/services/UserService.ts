import { Role, User } from "@/types/types";

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const getUser = async (userId: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const user = await response.json();
    return user;
};

export const getAllUsers = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch users")
    }

    const user = await response.json();
    return user;
};

const updateUserRole = async (userId: number, role: Role) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `users/updateRole/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role }),
    });
    if (!response.ok) {
        throw new Error("Failed to update role");
    }

    const user = await response.json();
    return user;
};

const UserService = {
    loginUser,
    getUser,
    getAllUsers,
    updateUserRole
};


export default UserService;