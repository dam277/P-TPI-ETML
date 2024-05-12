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

/**
 * Get the version of the back-end
 * @param {string} textVersion Text version of the back-end
 * @param {string} split Text to split the back-end version
 * @param {boolean} isBackEnd Is the version from the back-end
 * @returns {Array<string>} Array of the version
 * @example
 * // Get the version of the back-end
 * const version = GetVersion("Version 1.0.0", ".", true);
 */
export function GetVersion(textVersion: string, split: RegExp|string, options?: { isBackEnd: boolean }): Array<string>
{
    // Get the options
    const { isBackEnd = false } = options || {};

    // Split the differents elements of the back-end version
    let sections = textVersion.split(split);

    // Delete the useless spaces and delete from array the "false" content => false, 0, "", null, undefined, NaN with a filter
    sections = sections.map((item) => item.trim()).filter(Boolean);   

    // Check if the entry is from the backend
    if (isBackEnd) 
    {
        // Get the day and time
        const time = sections[1].split(" ");
        sections = [sections[0], time[0], time[1]];
    }

    // Return the version array
    return sections;
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

/*****************************************************************************************************************************************
 * @function GenererNumeroMatricule => Generate matricule numbers in the same way as the Excel file
 * @param {string} base => Matricule number base (first 8 digits)
 * @param {number} nbResult => Number of matricule numbers to be generated
 * 
 * @returns {Array} => Array containing all generated matricule numbers
 */
export function GenererNumeroMatricule(base, nbResult)
{
    // Check if the length of the base isn't greather than 8
    if (base.length > 8)
    {
        throw new Error('La base des numéros de matricule contient plus de 8 chiffres !')
    }
    else
    {
        // Generate random numbers until the base contains 8 numbers
        while (base.length < 8)
        {
            let randomNumber = Random(10)
            base += randomNumber.toString()
        }

        // Array which contains the generated matricule numbers
        let numeroMatriculeArray = []

        // Generate numbers according to the base entered
        for (let x = 0; x < nbResult; x++)
        {
            let nombreBase = base
            // Base decomposition
            let first = Number(nombreBase.substring(0, 1))
            let second = Number(nombreBase.substring(1, 2))
            let third = Number(nombreBase.substring(2, 3))
            let fourth = Number(nombreBase.substring(3, 4))
            let fifth = Number(nombreBase.substring(4, 5))
            let sixth = Number(nombreBase.substring(5, 6))
            let seventh = Number(nombreBase.substring(6, 7))
            let eigth = Number(nombreBase.substring(7, 8))

            // Product sum based on the Excel file values
            let sum = (first * 3) + (second * 2) + (third * 7) + (fourth * 6) + (fifth * 5) + (sixth * 4) + (seventh * 3) + (eigth * 2)

            // Determining the last digit of the number
            let integerResult = Number(Math.trunc(sum / 11))

            let lastNumber
            if ((sum - integerResult * 11) === 10)
            {
                lastNumber = 0
            }
            else
            {
                lastNumber = sum - (integerResult * 11)
            }

            // Addition of the matricule number in the array
            let newNumber = first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString() + sixth.toString() + seventh.toString() + eigth.toString() + lastNumber.toString()
            numeroMatriculeArray.push(newNumber)

            // Increment the base
            if (eigth != 9)
            {
                eigth += 1
            }
            else
            {
                seventh += 1
                eigth = 0

                if (seventh === 9)
                {
                    sixth += 1
                    seventh = 0

                    if (sixth === 9)
                    {
                        fifth += 5
                        sixth = 0

                        if (fifth === 9)
                        {
                            fourth += 1
                            fifth = 0

                            if (fourth === 9)
                            {
                                third += 1
                                fourth = 0

                                if (third === 9)
                                {
                                    second += 1
                                    third = 0

                                    if (second === 9)
                                    {
                                        first += 1
                                        second = 0
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // Modification of the base according to the previous base
            base = first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString() + sixth.toString() + seventh.toString() + eigth.toString() + lastNumber.toString()
        }
        return numeroMatriculeArray
    }
}