/**
 * @file IUser.d.ts
 * @description Interfaces for the user object
 * @author Damien Loup
 */

/**
 * User Interface
 * @param {number} id => User ID
 * @param {string} name => Username
 * @param {string} email => Email
 * @param {boolean} isBoss => Is Boss
 */
interface IUser 
{
    id_user: number;
    name: string;
    email: string;
    isBoss: boolean;
}

/**
 * User Context
 * @param {IUser} user => User
 * @param {Function} login => log the user in
 * @param {Function} logout => log the user out
 * @param {Boolean} loading => Loading state
 * @param {string} error => Error message
 * 
 * @example
 * const { user, makeApiCall, loading, error } = useContext<UserContext>(UserContext as any);
 */
export interface IUserContext
{ 
    actualUser: IUser|undefined, 
    login: (email: string, password: string) => void,
    logout: () => void,
    loading: Boolean,
    error: string|undefined
}

export default IUser;