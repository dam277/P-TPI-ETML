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
 * @enum {FIELDS} => Fields enumeration
 * @public
 * @example
 * cy.search({[FIELDS.SURNAME]: "Doe", [FIELDS.NAME]: "John"});
 */
export enum FIELDS
{
    SURNAME = "nom",
    NAME = "prenom",
    BIRTHDATE = "dateNaissance",
    ID = "idPersonne",
    PLATE = "plaque",
    GEAR = "engin",
    INVOICE = "facture",
    NPA = "npaLocalite",
    SOCIAL = "raisonSociale"
}

/**
 * @enum {LANGUAGES} => Languages enumeration
 * @public
 * @example
 * const language = LANGUAGES.FR
 */
export enum LANGUAGES
{
    FR = "Français",
    DE = "Deutsch",
    IT = "Italiano",
    RO = "Romaunch" 
}