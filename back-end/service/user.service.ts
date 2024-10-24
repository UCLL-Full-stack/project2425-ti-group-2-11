import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => {
    return [...userDb.getAllUsers()];
};

const getUserById = (id: number): User | undefined =>{
    const user = userDb.getUserById(id)
    if (user){
        return user;
    }
    throw new Error(`User with id ${id} not found`);
}

export default { getAllUsers, getUserById };
