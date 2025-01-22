export type User = {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    bio?: string;
    password?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    address?: string;
    gender?: string;
}

export type OnlineUser = {
    userId: string;
    socketId: string;
    profile: User;
}