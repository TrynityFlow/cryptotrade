import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(32, 'Too Long!')
    .matches(/^[0-9a-zA-Z]+$/, 'Must be alphanumberic')
    .required('This field is required'),

  password: Yup.string()
    .min(8, 'Too Short!')
    .minLowercase(1, 'Must contain at least 1 lower case letter')
    .minUppercase(1, 'Must contain at least 1 upper case letter')
    .minNumbers(1, 'Must contain at least 1 number')
    .minSymbols(1, 'Must contain at least 1 special character')
    .required('This field is required'),
});
