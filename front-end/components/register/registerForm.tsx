import React from "react";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Language from "../language/Language";
import CountryOptions from "./CountryOptions";

interface FormData {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  seller: boolean;
  newsLetter: boolean;
  role: string;
}

interface loginUserInput {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    seller: false,
    newsLetter: false,
    role: "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "radio" || type === "checkbox" ? value === "true" : value,
    }));

    console.log(formData);
  };

  const loginAfterRegister = async (email: string, password: string) => {
    const userInput = {
        emailAddress: email,
        password: password,
      };
    console.log(userInput);
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
            setTimeout(() => {
                window.location.href = "../";
            }, 2000);
        } else {
          alert("Invalid email or password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let seller: boolean = false;
    let newsLetter: boolean = false;

    formData.seller ? (seller = true) : (seller = false);
    formData.newsLetter ? (newsLetter = true) : (newsLetter = false);

    const address = {
      street: formData.street,
      houseNumber: formData.houseNumber,
      postalCode: formData.postalCode,
      state: formData.state,
      city: formData.city,
      country: formData.country,
    };
    const userInput = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      emailAddress: formData.emailAddress,
      password: formData.password,
      address,
      seller: seller,
      newsLetter: newsLetter,
      role: "user",
    };
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      if (response.ok) {
        console.log("User registered successfully");
        setStatusMessage("Successfully registered");
        setStatusMessage("Loggin in...");
        console.log(userInput.emailAddress, userInput.password)
        loginAfterRegister(userInput.emailAddress, userInput.password);
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="absolute top-0 right-0 m-3">
        <Language />
      </div>
      <main>
        <form className="grid grid-cols-3 gap-y-3" onSubmit={handleSubmit}>
          <label htmlFor="name">{t("register.fullname")}:</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="phoneNumber">{t("register.phonenumber")}: </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="+32 123 45 67 89"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="email">{t("register.email")}: </label>
          <input
            type="email"
            name="emailAddress"
            placeholder="John.doe@gmail.com"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="password">{t("register.password")}: </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="street">{t("register.streetname")}:</label>
          <input
            type="text"
            name="street"
            placeholder="Bondgenotenlaan"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="houseNumber">{t("register.housenumber")}:</label>
          <input
            type="number"
            name="houseNumber"
            placeholder="40"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="postalCode">{t("register.postalcode")}:</label>
          <input
            type="number"
            name="postalCode"
            placeholder="3000"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="city">{t("register.city")}:</label>
          <input
            type="text"
            name="city"
            placeholder="Leuven"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="state">{t("register.state")}:</label>
          <input
            type="text"
            name="state"
            placeholder="Vlaams Brabant"
            className="text-center ml-0 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          ></input>

          <label htmlFor="country">{t("register.country")}: </label>
          <select
            name="country"
            className="text-center ml-1 col-span-2 rounded-lg bg-white"
            required
            onChange={handleChange}
          >
            <option value="">{t("register.selectcountry")}</option>
            <CountryOptions />
          </select>

          <div title="Do you want to sell products on this site?">
            <label htmlFor="seller" className="mr-2">
              {t("register.seller")}
            </label>
            <i
              style={{ fontSize: "24px" }}
              className="fa fa-question-circle"
            ></i>
          </div>
          <div className="col-span-2 text-center">
            <label
              htmlFor="seller yes"
              className="mr-2"
              title="Select 'Yes' if you are a seller"
            >
              {t("register.yes")}:
            </label>
            <input
              type="radio"
              name="seller"
              value="true"
              checked={formData.seller === true}
              className="mr-4"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="seller no"
              className="mr-2"
              title="Select 'No' if you are not a seller"
            >
              {t("register.no")}:
            </label>
            <input
              type="radio"
              name="seller"
              value="false"
              checked={formData.seller === false}
              required
              onChange={handleChange}
            />
          </div>

          <div title="Do you want to receive a newsletter?">
            <label htmlFor="newsLetter" className="mr-2">
              {t("register.newsletter")}
            </label>
            <i
              style={{ fontSize: "24px" }}
              className="fa fa-question-circle"
            ></i>
          </div>
          <div className="col-span-2 text-center">
            <label
              htmlFor="newsletter yes"
              title="Select yes if you want to receive the newsletter"
              className="mr-2"
            >
              {t("register.yes")}:
            </label>
            <input
              type="radio"
              name="newsLetter"
              value="true"
              className="mr-4"
              checked={formData.newsLetter === true}
              required
              onChange={handleChange}
            />
            <label
              htmlFor="newsletter no"
              title="Select no if you do not want to receive the newsletter"
              className="mr-2"
            >
              {t("register.no")}:
            </label>
            <input
              type="radio"
              name="newsLetter"
              value="false"
              checked={formData.newsLetter === false}
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-span-3 text-center mt-5">
            <input
              type="submit"
              value={t("register.register")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"
            />
          </div>
        </form>
        {statusMessage && (
          <div className="m-1 p-1 bg-green-300 text-green-700">
            {statusMessage}
          </div>
        )}
      </main>
    </>
  );
};
export default RegisterForm;
