'use client';

import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { EyeClosedIcon } from '../icons/eyeClosed';
import { EyeOpenedIcon } from '../icons/eyeOpened';
import { InputField } from '../layout';
import { LoginSchema } from '../../schemas/login.validation';
import { Submit } from '../layout/inputs/submit';
import { useLogin } from '../../hooks/queryHooks';
import { useRouter } from 'next/router';
import { InputError } from '../layout/inputs/error';

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
  const router = useRouter();
  const { mutate, data, isError, isSuccess, isPending } = useLogin();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (values: Crypto.LoginFormData) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [data, isSuccess, router]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-transparent px-8 py-4 md:w-5/12">
      <header className="mb-8 text-2xl font-bold">
        Welcome to Crypto Trade
      </header>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        <Form className="flex w-full flex-col items-center justify-center gap-y-5">
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
          <span className="mt-2"></span>
          <Submit isLoading={isPending}>Sign in</Submit>
          <InputError>{isError ? 'Unable Find Matching User!' : ''}</InputError>
        </Form>
      </Formik>
    </div>
  );
};
