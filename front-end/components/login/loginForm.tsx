import { useEffect, useState } from "react";
import Navbar from "../header/navbar";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import next from "next";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check for pre-filled values when the component mounts
    const emailInput = document.querySelector<HTMLInputElement>(
      "input[name='email']"
    );
    const passwordInput = document.querySelector<HTMLInputElement>(
      "input[name='password']"
    );

    if (emailInput && emailInput.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: emailInput.value,
      }));
    }

    if (passwordInput && passwordInput.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: passwordInput.value,
      }));
    }
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = {
      emailAddress: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log(data);
        if (data.message === "Authentication Succesful") {
          window.location.href = "../";
        } else {
          alert("Invalid email or password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // console.log(formData)
  };
  return (
    <>
      <div className="w-1/3 h-1/2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl">{t("login.login")}</h1>
        <form
          action="login"
          className="flex flex-col pt-10"
          onSubmit={handleSubmit}
        >
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
