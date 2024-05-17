import * as enums from "../support/enums";

/**
 * Get a random text of a certain length
 * @param {number} nbLetters Number of letters to generate 
 * @returns {string} Random text generated 
 * @example
 * // Get a random text of 8 letters
 * const text = RandomText(8);
 */
export function RandomText(nbLetters: number): string
{
    let text = "";            // Set a random text

    // Create 8 letters randomly and add them to the random text
    for (let i = 0; i < nbLetters; i++) 
    {
        // Set a random index
        let randomIndex = Random(26);

        // Get a random letter from the index and put into the text
        let randomLetter = String.fromCharCode(65 + randomIndex);
        text += randomLetter;
    }

    // Return the text
    return text;
}

/**
 * Get a random number
 * @param {number} max Max number to generate 
 * @returns {number} Random number generated 
 * @example
 * // Get a random number
 * const number = Random(10);
 */
export function Random(max: number): number
{
    // Generate a random number and return it
    return (Math.floor(Math.random() * max));
}

/*****************************************************************************************************************************************
 * @function GetLanguageDatas => Get the language datas of an object. eg: datas.fr.person (to find a field or smth else in the good language)
 * @param {LANGUAGES} language => Language of the website
 * @param {Object} datas => Datas to filter
 * 
 * @returns {Object} => Object of the filtered datas 
 */
export function GetLanguageDatas(language: enums.LANGUAGES, datas: { fr: any, de: any, it: any, ro: any}): any
{
    // Check which language was passed
    switch(language)
    {
        case enums.LANGUAGES.FR:
            return datas.fr;
        case enums.LANGUAGES.DE:
            return datas.de;
        case enums.LANGUAGES.IT:
            return datas.it;
        case enums.LANGUAGES.RO:
            return datas.ro;
        default:
            throw new Error("Language not found");
    }
}