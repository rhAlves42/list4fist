import * as Yup from 'yup';
import { IChangePassword } from '../interfaces.global';

const regexEmailStr = `^(([^<>()\\[\\]\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\.,;:\\s@"]+)*)|(".+"))@`;
const regexEmailStr2 = `((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.){1,2}[a-zA-Z]{2,}))$`;
const regexEmail = new RegExp(regexEmailStr + regexEmailStr2);

const fieldError = (field: string) => `${field} is required`;
const passwordValidation = Yup.string()
    .min(6, 'A senha precisa ter no mínimo 6 dígitos')
    .matches(/[^0-9\s]+/, 'Necessário conter letras e números.')
    .matches(/[^a-zA-Z\s]+/, 'Necessário conter letras e números.')
    .required(fieldError('senha'));

const schema = {
    email: Yup.string()
        .matches(regexEmail, 'Informe um email válido')
        .required(fieldError('email')),
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
};

export const validateChangePasswordData = async (data: IChangePassword) => {
    const schemaValidator = Yup.object().shape(schema);
    try {
        schemaValidator.validateSync(data);
    } catch (error) {
        return error;
    }
};
