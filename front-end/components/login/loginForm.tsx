import { useState } from "react";
import Navbar from "../header/navbar";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginForm: React.FC = () => {

  const { t } = useTranslation();

  const [formData, setFormData] = useState<LoginFormData>({
    name: '',
    password: '',
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
        <h1 className="font-bold text-3xl">{t("login.login")}</h1>
        <form action="login" className="flex flex-col pt-10" onSubmit={handleSubmit}>
          <label htmlFor="email">{t("login.email")}:</label>
          <input
            type="text"
            placeholder={t("login.email")}
            id="email"
            required
            className="p-2"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">{t("login.password")}:</label>
          <input
            type="password"
            id="password"
            placeholder={t("login.password")}
            required
            className="p-2"
            name="password"
            onChange={handleChange}
          />
          <input
            type="submit"
            id="submit"
            value={t("login.login")}
            className="mt-5 bg-white p-1 self-center hover:cursor-pointer hover:bg-gray-600"
          />
        </form>
        <p
          className="mt-5 hover:cursor-pointer"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          {t("login.NoAccount")}
        </p>
      </div>
    </>
  );
};

export default LoginForm;
