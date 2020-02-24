
import * as Yup from 'yup';
import { User } from './user.model';
import { IChangePassword } from '../interfaces.global';

const regexPhone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
const regexEmailStr = `^(([^<>()\\[\\]\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\.,;:\\s@"]+)*)|(".+"))@`;
const regexEmailStr2 = `((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.){1,2}[a-zA-Z]{2,}))$`;
const regexEmail = new RegExp(regexEmailStr + regexEmailStr2);
const regexNameSurname = /(([A-Za-z]{2,})\s)(([A-Za-z]{1,})\s?){1,}/;
const fieldError = (field: string) => `Campo ${field} é obrigatório`;

const schemaUser = {
    name: Yup.string()
        .matches(regexNameSurname, 'Informe um nome válido')
        .required(fieldError('nome')),
    email: Yup.string()
        .matches(regexEmail, 'Informe um email válido')
        .required(fieldError('email')),
    phone: Yup.string()
        .matches(regexPhone, 'Informe um telefone válido')
        .required(fieldError('telefone')),
    password: Yup.string()
        .min(6, 'A senha precisa ter no mínimo 6 dígitos')
        .matches(/[^0-9\s]+/, 'Necessário conter letras e números.')
        .matches(/[^a-zA-Z\s]+/, 'Necessário conter letras e números.')
        .required(fieldError('senha'))
};

export const validateUser =  async (user: User) => {
    const validateUserSchema =  Yup.object().shape(schemaUser);
    try {
        validateUserSchema.validateSync(user);
    } catch (error) {
        return error;
    }
};

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