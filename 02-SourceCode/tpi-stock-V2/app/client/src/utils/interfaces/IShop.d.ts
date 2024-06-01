/**
 * @file IShop.d.ts
 * @description Interface for the shop object
 * @author Damien Loup
 */

/**
 * Shop Interface
 * @param {number|string} id_shop => Shop ID
 * @param {string} name => Shop name
 * @param {string} city => Shop city
 */
interface IShop
{
    id_shop: number;
    name: string;
    city: string;
}

export default IShop;