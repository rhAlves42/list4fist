import * as bcrypt from 'bcrypt';

interface IValidatePassword {
    currentPassword: string | String;
    dbPassword: string;
}

export const validateUserPassword = (data: IValidatePassword) => {
    const { currentPassword, dbPassword } = data;
    const currentPasswordIsCorrect = bcrypt.compareSync(currentPassword, dbPassword);
    return currentPasswordIsCorrect;
}