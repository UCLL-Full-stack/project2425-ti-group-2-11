import Navbar from "../header/navbar";
import Image from 'next/image';

const LoginForm: React.FC = () => {
    return (
        <>
            <div className="w-1/3 h-1/2 bg-red-500 flex flex-col items-center justify-center">
                <h1 className="font-bold text-3xl">Login</h1>
                <form action="login" className="flex flex-col pt-10">
                    <label htmlFor="name"></label>
                    <input type="text" placeholder="email" id="name" required className="p-2" />
                    <label htmlFor="password"></label>
                    <input type="password" id="password" placeholder="password" required className="mt-5 p-2" />
                    <input type="submit" id="submit" value="Login" className="mt-5 bg-white max-w-12 p-1 self-center hover:cursor-pointer hover:bg-gray-600" />
                </form>
                <p>No account? Register <u className="text-blue-800" onClick={() => { window.location.href = "/login"; }}>here</u></p>
            </div>
        </>
    );
}

export default LoginForm;