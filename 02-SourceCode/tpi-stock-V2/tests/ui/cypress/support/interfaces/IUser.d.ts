/**
 * Interface for User
 * @interface IUser
 * 
 * @property {string} name - The name of the user
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 * @property {boolean|string} shop - The shop of the user
 * @property {boolean} boss - The boss of the user
 */
interface IUser 
{
    name: string;
    email: string;
    password: string;
    shop: boolean|string;
    boss: boolean;
}

export default IUser;