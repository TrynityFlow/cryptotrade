'use client';

import React from 'react';
import { EyeClosedIcon } from '../icons/eyeClosed';
import { EyeOpenedIcon } from '../icons/eyeOpened';
import { InputField } from '../layout';
export const LoginForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [passValue, setPassValue] = React.useState('');
  const [userValue, setUserValue] = React.useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputHandler = (
    setFn: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (e: React.FormEvent<HTMLInputElement>) => {
      setFn(e.currentTarget.value);
    };
  };

  return (
    <div className="bg-background h-full md:w-5/12">
      <InputField
        type="text"
        label="Username"
        value={userValue}
        setValue={inputHandler(setUserValue)}
      />
      <InputField
        type={isVisible ? 'text' : 'password'}
        setValue={inputHandler(setPassValue)}
        value={passValue}
        label="Password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeClosedIcon className="text-default-400 pointer-events-none text-2xl" />
            ) : (
              <EyeOpenedIcon className="text-default-400 pointer-events-none text-2xl" />
            )}
          </button>
        }
      />
    </div>
  );
};
