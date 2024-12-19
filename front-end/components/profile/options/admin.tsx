import { User } from "@/types/types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAllUsers } from "@/services/UserService";
import { Trash } from "lucide-react";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const decodedToken = token ? jwtDecode(token) : null;
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        data && setUsers(data);
      } catch (error) {}
    };
    loadUsers();
  }, [users]);
  if (!users) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <div>
          <h1 className="mb-3">Admin</h1>
        </div>
        <div className="w-full flex flex-col gap-3">
          {users.map((user) => (
            <section
              className="flex justify-between bg-white shadow-md py-2 px-2"
              key={user.id}
            >
              <p>{user.name}</p>
              <button>
                <Trash />
              </button>
            </section>
          ))}
        </div>
      </>
    );
  }
};

export default Admin;
