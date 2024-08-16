import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,  // Use environment variables
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2024-08-14',
    useCdn: false,
    token: process.env.SANITY_API_KEY,
});

export default client;