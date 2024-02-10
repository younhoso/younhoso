export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {title: 'Username', name: 'username', type: 'string'},
    {title: 'Name', name: 'name', type: 'string'},
    {title: 'Email', name: 'email', type: 'string'},
    {title: 'Image', name: 'image', type: 'string'},
    {title: 'Followers', name: 'followers', type: 'array', 
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}]
        }
      ],
      validation: (Rule: { unique: () => any }) => Rule.unique()
    },
    {title: 'Bookmarks', name: 'bookmarks', type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule: { unique: () => any; }) => Rule.unique()
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email'
    }
  }
}