/**
 * @file OrderList.tsx
 * @description OrderList component to display the list of orders
 * @author Damien Loup
 */

// Import libraries
import { useContext, useState } from "react";
import { useFetch } from "../../utils/hooks/useFetch";

// Import interfaces
import IArticle from "../../utils/interfaces/IArticle";
import IOrder from "../../utils/interfaces/IOrder";
import IUser, { IUserContext } from "../../utils/interfaces/IUser";
import IShop from "../../utils/interfaces/IShop";

// Import contexts
import { UserContext } from "../../utils/contexts/UserContext";

// Import globals
import SortArray from "../../utils/global/SortArray";

/**
 * OrderList component to display the list of orders
 * @param orders => List of orders
 * @returns => OrderList component
 */
function OrderList({ orders, shop, dataApiCall } : { orders: [{ order: IOrder, user: IUser, article: IArticle }], shop: IShop, dataApiCall: any|undefined }) 
{   
    // Get user context
    const { actualUser } = useContext<IUserContext>(UserContext as any);

    // Get makeApiCall function, data, loading and error from useFetch hook for shop, articles and orders
    const [ updateOrderApiCall, updatedOrderData, updatedOrderLoading, updatedOrderError ] = useFetch<{order: IOrder }>();

    // Set the sort state
    const [sort, setSort] = useState<{column: string, order: boolean}>({column: "O-id_order", order: true});

    /**
     * Handle the sort of the array
     * @param e => Event of the button
     * @returns => Sort the array
     * 
     * @example
     * onClick={(e) => handleSort(e)}
     */
    const handleSort = (e: React.MouseEvent<HTMLElement, MouseEvent>) => SortArray(e, orders, sort, setSort, "O");

    /**
     * Handle the status of the order
     * @param e => Event of the button
     * 
     * @example
     * onClick={(e) => handleStatus(e)}
     */
    const handleStatus = (e: React.MouseEvent<HTMLElement, MouseEvent>) => 
    {
        // Get the action and the id
        const [action, id] = e.currentTarget.id.split("-");
        
        // Update the order
        updateOrderApiCall(`/update_order/${id}`, "POST", {status: action === "approve"}, "application/json").then(() => 
        {
            if (dataApiCall)
                dataApiCall(`/shop/${shop.id_shop}/orders`, "GET");
        });
    }

    // Return the order list
    return (
        <table className="w-full text-left">
            <thead className="bg-colorpalette-backgrounds-secondary">
                <tr className="cursor-pointer">
                    <th id={`O-id_order:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Order No.</th>
                    <th id={`O-fk_article:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Art. No.</th>
                    <th id={`O-units:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Units ordered</th>
                    <th id={`O-name:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Ordered by</th>
                    {actualUser && actualUser.isBoss && <th id={`O-status:${shop.id_shop}:2`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Approve/Refuse</th>}
                    <th id={`O-status:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Status</th>
                </tr>
            </thead>
            <tbody className="bg-colorpalette-backgrounds-tertiary">
                {orders.map(({order, user, article}) =>
                    <tr className={`${order.status.toLowerCase() === "pending" ? "border-colorpalette-status-pending" : order.status === "Approved" ? "border-colorpalette-status-ok" : "border-colorpalette-status-notOk"} border-2 p-2`} key={`order-${order.id_order}`}>
                        <td className="p-2">O-{order.id_order}</td>
                        <td className="p-2">A-{article.id_article}</td>
                        <td className="p-2">{order.units}</td>
                        <td className="p-2">{user.name}</td>
                        {
                            actualUser && actualUser.isBoss &&
                            <td className="p-2">
                                {
                                    order.status.toLowerCase() === "pending" &&
                                    <>
                                        <button id={`approve-${order.id_order}`} onClick={(e) => handleStatus(e)} className="bg-colorpalette-status-ok bg-opacity-50 w-10 p-1 mx-1 hover:bg-opacity-80">✓</button>
                                        <button id={`refuse-${order.id_order}`} onClick={(e) => handleStatus(e)} className="bg-colorpalette-status-notOk bg-opacity-50 w-10 p-1 mx-1 hover:bg-opacity-80">X</button>
                                    </>
                                }
                            </td>
                        }
                        <td className={`${order.status.toLowerCase() === "pending" ? "bg-colorpalette-status-pending" : order.status === "Approved" ? "bg-colorpalette-status-ok" : "bg-colorpalette-status-notOk"} p-2`}>{order.status}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default OrderList;