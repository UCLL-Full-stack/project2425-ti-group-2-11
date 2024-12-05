import { useState } from "react";
import Navbar from "../header/navbar";
import Image from "next/image";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    console.log(name, value, type)
    setFormData((prevFormData) => ({
        ...prevFormData,
        
    }));
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
  };

  return (
    <>
      <div className="w-1/3 h-1/2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl">Login</h1>
        <form action="login" className="flex flex-col pt-10" onSubmit={handleSubmit}>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            placeholder="email"
            id="email"
            required
            className="p-2"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            required
            className="p-2"
            name="password"
            onChange={handleChange}
          />
          <input
            type="submit"
            id="submit"
            value="Login"
            className="mt-5 bg-white max-w-12 p-1 self-center hover:cursor-pointer hover:bg-gray-600"
          />
        </form>
        <p
          className="mt-5 hover:cursor-pointer"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          No account? Register here
        </p>
      </div>
    </>
  );
};

export default LoginForm;
