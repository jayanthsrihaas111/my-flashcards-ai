import { NextResponse } from 'next/server';
import groq from 'groq';
import client from '@/utils/sanity';

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
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
11. Only generate 10 flashcards.

Return in the following JSON format:
{
    "flashcards": [{
        "front": "str",
        "back": "str"
    }]
}

*[_type == "flashcard"] {
  _id,
  title,
  content
}

`;

// export async function POST(req) {
//     const data = await req.json();
  
//     try {
//       const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: 'Llama3-8b-8192',
//           messages: [
//             { role: 'system', content: systemPrompt },
//             { role: 'user', content: data },
//           ],
//           stream: false,
//         }),
//       });
  
//       const rawResponse = await response.text(); // Get the raw response as text
  
//       try {
//         const completion = JSON.parse(rawResponse); // Attempt to parse as JSON
//         const flashcards = JSON.parse(completion.choices[0].message.content);
//         return NextResponse.json(flashcards.flashcards);
//       } catch (parseError) {
//         console.error('Failed to parse JSON:', parseError);
//         console.log('Raw response:', rawResponse); // Log the raw response for debugging
//         return new NextResponse('Invalid response format from the API', { status: 500 });
//       }
  
//     } catch (error) {
//       console.error('Error handling POST request:', error);
//       return new NextResponse('Internal Server Error', { status: 500 });
//     }
//   }


export async function POST(request) {
    try {
        const { query } = await request.json();
        console.log('Received query:', query); // Log the received query

        // Execute GROQ query
        const results = await client.fetch(groq`${query}`);
        console.log('Query results:', results); // Log the results

        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error processing GROQ query:', error);

        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}