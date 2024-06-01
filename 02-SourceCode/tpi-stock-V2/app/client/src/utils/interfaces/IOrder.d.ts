/**
 * @file IOrder.d.ts
 * @description Interface for the order object
 * @author Damien Loup
 */

/**
 * Order Interface
 * @param {number} id_order => Order ID
 * @param {number} units => Order units
 * @param {string} status => Order status
 */
interface IOrder
{
    id_order: number;
    units: number;
    status: string;
}

export default IOrder;