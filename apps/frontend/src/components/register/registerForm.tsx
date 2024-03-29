'use client';

import React, { useContext, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { EyeClosedIcon } from '../icons/eyeClosed';
import { EyeOpenedIcon } from '../icons/eyeOpened';
import { InputField } from '../ui';
import { RegisterSchema } from '../../schemas/register.validation';
import { Submit } from '../ui/inputs/submit';
import { useRegister } from '../../hooks/queryHooks';
import { useRouter } from 'next/router';
import { LoginContext } from '../../libs/loginContext';
import { InputError } from '../ui/inputs/error';
import Link from 'next/link';

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

export const RegisterForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();
  const { updateUser } = useContext(LoginContext);
  const { mutate, data, isError, isSuccess, isPending } = useRegister();
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (values: Crypto.RegisterFormData) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      updateUser(data.data);
      router.push('/');
    }
  }, [data, isSuccess, router, updateUser]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-transparent px-8 py-4 md:w-5/12">
      <header className="mb-8 text-2xl font-bold">
        Welcome to Crypto Trade
      </header>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          username: '',
          password: '',
          repeat: '',
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
          <Field name="repeat">
            {({ field, meta }: IField) => (
              <InputField
                label="Confirm Password"
                type="password"
                field={field}
                meta={meta}
              />
            )}
          </Field>
          <span className="mt-2"></span>
          <Submit isLoading={isPending}>Sign up</Submit>
          <InputError>{isError ? 'User already exists!' : ''}</InputError>
          <Link href="/login" className="text-primary-600">
            Already have an account?
          </Link>
        </Form>
      </Formik>
    </div>
  );
};
