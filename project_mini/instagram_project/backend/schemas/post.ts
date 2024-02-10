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
      title: 'Release Date',
      name: 'releaseDate',
      type: 'datetime'
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
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      date: 'releaseDate',
      media: 'photo'
    },
    prepare: ({title, authorName, authorUsername, date, media}: {title: string, authorName: string, authorUsername: string, date: string, media: string}) => {
      return {
        title,
        subtitle: `${new Date(date).toLocaleDateString("ko-KR", {timeZone: "Asia/Seoul"})} 
                  by ${authorName}, (${authorUsername})`,
        media
      }
    }
  }
}