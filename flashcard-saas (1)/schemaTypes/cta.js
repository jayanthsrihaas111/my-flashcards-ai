import { defineType, defineField } from 'sanity'

export const cta = defineType({
  type: "object",
  name: "cta",
  title: "Call to action",
  fields: [
    defineField({
      type: "string",
      name: "label",
    }),
    defineField({
      type: "url",
      name: "link",
    }),
  ],
});

