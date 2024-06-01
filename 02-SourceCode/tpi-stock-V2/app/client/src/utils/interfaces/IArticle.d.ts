/**
 * @file Article.d.ts
 * @description Interface for the article object
 * @author Damien Loup
 */

/**
 * Article Interface
 * @param {number} id_article => Article ID
 * @param {string} description => Article description
 * @param {string} brand => Article brand
 * @param {string} collection => Article collection
 * @param {string} size => Article size
 * @param {string} color => Article color
 * @param {string} status => Article status
 */
interface IArticle 
{
    id_article: number;
    description: string;
    brand: string;
    collection: string;
    size: string;
    color: string;
    status: string;
}

export default IArticle;