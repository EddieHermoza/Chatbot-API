export interface IUserSession {
    id: number;
    username: string;
    email: string;
    roleId: number;
    iat?: number;
    exp?: number;
}
