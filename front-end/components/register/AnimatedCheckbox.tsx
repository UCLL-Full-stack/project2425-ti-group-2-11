import React, { useState } from 'react';

interface AnimatedCheckboxProps {
  label: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({ label, onchange, name }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: e.target.checked ? true : false,
        name,
      },
    };
    onchange(newEvent as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
        />
        <div
          className={`w-6 h-6 border-2 rounded-md transition-all duration-300 ${
            isChecked ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
          }`}
        >
          <svg
            className={`w-full h-full text-white stroke-current ${
              isChecked ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default AnimatedCheckbox;