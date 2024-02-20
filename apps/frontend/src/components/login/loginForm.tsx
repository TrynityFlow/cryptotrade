'use client';

import React from 'react';
import { Field, Form, Formik } from 'formik';
import { EyeClosedIcon } from '../icons/eyeClosed';
import { EyeOpenedIcon } from '../icons/eyeOpened';
import { InputField } from '../layout';
import { LoginSchema } from '../../schemas/login.validation';
import { Submit } from '../layout/inputs/submit';

interface IField {
  field: {
    name: string;
    value: string;
  };
  meta: {
    touched: boolean;
    error: string;
  };
}

export const LoginForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="bg-background h-full md:w-5/12 w-full px-8 flex items-center py-4 justify-center flex-col">
      <header className='mb-6 font-bold text-2xl'>Welcome to Crypto Trade</header>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className='flex w-full items-center justify-center flex-col gap-y-4'>
          <Field name="username">
            {({ field, meta }: IField) => {
              return (
                <InputField
                  label="Username"
                  type="text"
                  field={field}
                  meta={meta}
                />
              );
            }}
          </Field>
          <Field name="password">
            {({ field, meta }: IField) => (
              <InputField
                label="Password"
                type={isVisible ? 'text' : 'password'}
                field={field}
                meta={meta}
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
            )}
          </Field>
          <Submit>Sign in</Submit>
        </Form>
      </Formik>
    </div>
  );
};
