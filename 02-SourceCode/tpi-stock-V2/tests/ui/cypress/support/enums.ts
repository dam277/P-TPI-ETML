/**
 * @enum {LOGTYPES} => Log types enumeration
 * @public
 * @example
 * cy.log("message", LOGTYPES.DEFAULT);
 */
export enum LOGTYPES
{
    DEFAULT = "#a2b3c7",
    SUCCESS = "#10b981",
    INFO = "#0394fc",
    WARNING = "#fc7b03",
    ERROR = "#dc2626"
}

/**
 * @enum {ARTICLEFIELDS} => Article fields enumeration
 * @public
 * @example
 * const field = ARTICLEFIELDS.TITLE
 */
export enum ARTICLEFIELDS
{
    ARTNO = "Art. No.",
    DESCRIPTION = "Description",
    BRAND = "Brand",
    COLLECTION = "Collection",
    SIZE = "Size",
    COLOR = "Color",
    UNITSINSTOCK = "Units in stock",
    UNITSSOLD = "Units sold",
    STATUS = "Status",
}

/**
 * @enum {ORDERFIELDS} => Order fields enumeration
 * @public
 * @example
 * const field = ORDERFIELDS.ORDERNO
 */
export enum ORDERFIELDS
{
    ORDERNO = "Order No.",
    ARTNO = "Art. No.",
    UNITSORDERED = "Units ordered",
    ORDEREDBY = "Ordered by",
    STATUS = "Status",
}