import { defineType, defineField, defineArrayMember } from 'sanity'

export const heroBlock = defineType({
  type: "object",
  name: "heroBlock",
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
      type: "image",
      name: "image",
      options: { hotspot: true },
    }),
    defineField({
      type: "array",
      name: "cta",
      title: "Call to actions",
      of: [
        defineArrayMember({
          type: "cta",
        }),
      ],
    }),
  ],
});

