import { useState } from "react";

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

const RegisterForm: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        phoneNumber: '',
        emailAddress: '',
        password: '',
        street: '',
        houseNumber: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
        seller: false,
        newsLetter: false,
        role: 'user'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let seller: boolean = false;
    let newsLetter: boolean = false;

    formData.seller ? seller = true : seller = false;
    formData.newsLetter ? newsLetter = true : newsLetter = false;

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
      <main>
        <form className="grid grid-cols-3 gap-y-3" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="+32 123 45 67 89"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="emailAddress"
            placeholder="John.doe@gmail.com"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="street">Street Name:</label>
          <input
            type="text"
            name="street"
            placeholder="Bondgenotenlaan"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="houseNumber">House Number:</label>
          <input
            type="number"
            name="houseNumber"
            placeholder="40"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="number"
            name="postalCode"
            placeholder="3000"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            placeholder="Leuven"
            className="text-center ml-1 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          />

          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            placeholder="Vlaams Brabant"
            className="text-center ml-0 col-span-2 rounded-lg"
            required
            onChange={handleChange}
          ></input>

          <label htmlFor="country">Country: </label>
          <select
            name="country"
            className="text-center ml-1 col-span-2 rounded-lg bg-white"
            required
            onChange={handleChange}
          >
            <option value="">Select a country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Åland Islands">Åland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">
              Bosnia and Herzegovina
            </option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">
              British Indian Ocean Territory
            </option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">
              Central African Republic
            </option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands">
              Cocos (Keeling) Islands
            </option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote d'Ivoire">Cote d'Ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands (Malvinas)">
              Falkland Islands (Malvinas)
            </option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">
              French Southern Territories
            </option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guernsey">Guernsey</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-bissau">Guinea-bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard Island and Mcdonald Islands">
              Heard Island and Mcdonald Islands
            </option>
            <option value="Holy See (Vatican City State)">
              Holy See (Vatican City State)
            </option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jersey">Jersey</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="North Korea">North Korea</option>
            <option value="South Korea">South Korea</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">
              Libyan Arab Jamahiriya
            </option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macao">Macao</option>
            <option value="North Macedonia">North Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Federated States of">
              Micronesia, Federated States of
            </option>
            <option value="Moldova, Republic of">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands">
              Northern Mariana Islands
            </option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestinian Territory, Occupied">
              Palestinian Territory, Occupied
            </option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russian">Russian</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Pierre and Miquelon">
              Saint Pierre and Miquelon
            </option>
            <option value="Saint Vincent and The Grenadines">
              Saint Vincent and The Grenadines
            </option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard and Jan Mayen">
              Svalbard and Jan Mayen
            </option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian">Syrian</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-leste">Timor-leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos Islands">
              Turks and Caicos Islands
            </option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands, British">
              Virgin Islands, British
            </option>
            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
            <option value="Wallis and Futuna">Wallis and Futuna</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>

          <div title="Do you want to sell products on this site?">
            <label htmlFor="seller" className="mr-2">
              Seller
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
              Yes:
            </label>
            <input
              type="radio"
              name="seller"
              value="true"
              className="mr-4"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="seller no"
              className="mr-2"
              title="Select 'No' if you are not a seller"
            >
              No:
            </label>
            <input
              type="radio"
              name="seller"
              value="false"
              required
              onChange={handleChange}
            />
          </div>

          <div title="Do you want to receive a newsletter?">
            <label htmlFor="newsLetter" className="mr-2">
              Newsletter
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
              Yes:
            </label>
            <input
              type="radio"
              name="newsletter"
              value="true"
              className="mr-4"
              required
              onChange={handleChange}
            />
            <label
              htmlFor="newsletter no"
              title="Select no if you do not want to receive the newsletter"
              className="mr-2"
            >
              No:
            </label>
            <input
              type="radio"
              name="newsletter"
              value="false"
              required
              onChange={handleChange}
            />
          </div>

          <div className="col-span-3 text-center mt-5">
            <input
              type="submit"
              value="Register"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer"
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default RegisterForm;
