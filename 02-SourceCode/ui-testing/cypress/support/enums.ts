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
s
/**
 * @enum {TOGGLE} => Switch toggle from on/off to off/on enumeration
 * @public
 * @example
 * const toggle = TOGGLE.ON
 */
export enum TOGGLE
{
    ON,
    OFF
}

/**
 * @enum {CALENDAR} => Get the next or before calendar week 
 * @public
 * @example
 * const calendar = CALENDAR.NEXT
 */
export enum CALENDAR 
{
    NEXT,
    PREVIOUS
}

export enum CANTONS
{
    AI = 'ai',
    AR = 'ar',
    BL = 'bl',
    FL = 'fl',
    FR = 'fr',
    GE = 'ge',
    GL = 'gl',
    GR = 'gr',
    MP = 'mp',
    NW = 'nw',
    OW = 'ow',
    SO = 'so',
    SG = 'sg',
    SZ = 'sz',
    TG = 'tg',
    TI = 'ti',
    UR = 'ur',
    VS = 'vs'
}