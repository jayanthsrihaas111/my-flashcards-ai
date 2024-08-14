import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'flashcard-saas',

  projectId: '6ig5v5oh',
  dataset: 'flashcards',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
