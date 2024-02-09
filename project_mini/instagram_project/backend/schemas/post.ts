export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}]
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image'
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}]
        }
      ],
      validation: (Rule: { unique: () => any; }) => Rule.unique()
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}]
            },
            {
              title: 'Comment',
              name: 'comment',
              type: 'string'
            }
          ]
        }
      ]
    }
  ]
}