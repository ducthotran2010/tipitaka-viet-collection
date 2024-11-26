import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiUrl = 'https://api.html-to-markdown.com/v1/convert';
const apiKey = process.env.HTML2MARKDOWN_API_KEY;

/**
 * Make a POST request to the API to convert HTML to Markdown
 *
 * Example CURL request:
 * curl --location --request POST 'https://api.html-to-markdown.com/v1/convert' \
 * --header 'X-API-Key: $API_KEY' \
 * --header 'Content-Type: application/json' \
 * --data-raw '{ "html": "<strong>bold text</strong>" }'
 *
 * @param {*} html
 * @returns JSON object { "markdown": "content" }
 */
export async function convertHtmlToMarkdown(html) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        html: html,
      },
      {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.markdown;
  } catch (error) {
    console.error('Error converting HTML to Markdown:', error);
    throw error;
  }
}
