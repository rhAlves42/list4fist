import { Schema, Document } from 'mongoose';

export const UserSchema  = new Schema ({
    id: { type: Number, auto:true },
    name: { type: String, required: true, maxlength: 200 },
    email: { type: String, maxlength: 200, required: true},
    phone: { type: String, maxlength: 15, required: true },
    password: { type: String,  maxlength: 200, required:true },
    status: { type: Number, required: true },
    role: { type: Number, required: true},
    urlFrontagePhoto: { type: String, required: false },
});

export interface IUser {
    name: String;
    email: String;
    phone: String;
    password: String;
    status: Number;
    role: Number;
    urlFrontagePhoto?: String;
}

export interface User extends Document, IUser {}
