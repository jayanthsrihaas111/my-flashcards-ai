import { defineType, defineField, defineArrayMember } from 'sanity'

export const ctaBlock = defineType({
  type: "object",
  name: "ctaBlock",
  title: "Call to action block",
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "string",
      name: "subtitle",
    }),
    defineField({
      type: "array",
      name: "ctas",
      title: "Call to actions",
      of: [
        defineArrayMember({
          type: "cta",
        }),
      ],
    }),
  ],
});

