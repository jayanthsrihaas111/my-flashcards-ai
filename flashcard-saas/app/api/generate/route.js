import { NextResponse } from 'next/server';
import fetch from 'node-fetch'; // or any other HTTP client
import Groq from "groq-sdk";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Your task is to generate flashcards for a given topic, regardless of how the topic is capitalized. Whether the input is 'java', 'Java', or 'JAVA', you should treat it the same way and generate the appropriate flashcards. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flash card focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrases in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 9 flashcards.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const data = await request.json();
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data.query }, // Using the 'query' key from the request body
      ],
      model: "llama3-8b-8192",
      response_format: { type: 'json_object' },
    });

    const flashcards = JSON.parse(chatCompletion.choices[0].message.content);
    return NextResponse.json({ flashcards: flashcards.flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
}










/*
import { NextResponse } from 'next/server';
import fetch from 'node-fetch'; // or any other HTTP client
import client from '@/utils/sanity'; // Ensure this import path is correct
import Groq from 'groq-sdk';

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrases in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  const chatCompletion = await getGroqChatCompletion(request);
  const flashcards = JSON.parse(chatCompletion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcards);
}

async function getGroqChatCompletion(request) {
  const data = await request.text();
  return groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'llama3-8b-8192',
    response_format: { type: 'json_object' },
  });
}



// export async function POST(request) {
//     try {
//         const { query } = await request.json();
//         console.log('Received query:', query); // Log the received query

//         // Call external service to generate flashcards
//         const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Ensure this API key is valid
//             },
//             body: JSON.stringify({
//                 model: 'Llama3-8b-8192',
//                 messages: [
//                     { role: 'system', content: systemPrompt },
//                     { role: 'user', content: query },
//                 ],
//                 stream: false,
//             }),
//         });

//         const rawResponse = await response.text(); // Get the raw response as text
//         console.log('Raw response:', rawResponse); // Log the raw response for debugging

//         try {
//             const completion = JSON.parse(rawResponse); // Attempt to parse as JSON
//             const content = completion.choices[0].message.content;

//             // Parse the flashcards from the content
//             const flashcardsResponse = JSON.parse(content);
//             const flashcards = flashcardsResponse.flashcards;

//             // Save flashcards to Sanity
//             const results = await Promise.all(flashcards.map(card => 
//                 client.create({
//                     _type: 'flashcard', // Ensure this matches your document type
//                     front: card.front,
//                     back: card.back
//                 })
//             ));

//             console.log('Documents created:', results); // Log the results

//             return new NextResponse(JSON.stringify(results), {
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         } catch (parseError) {
//             console.error('Failed to parse JSON:', parseError);
//             console.log('Raw response:', rawResponse); // Log the raw response for debugging
//             return new NextResponse('Invalid response format from the API', { status: 500 });
//         }

//     } catch (error) {
//         console.error('Error handling POST request:', error);
//         return new NextResponse('Internal Server Error', { status: 500 });
//     }
// }

*/