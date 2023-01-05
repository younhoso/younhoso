const menu = [
  {
    name: 'main', // 메뉴 name은 router name으로 한다
    title: 'Main',
    children: [
      {
        name: 'main',
        title: '메인'
      }
    ]
  },
  {
    name: 'history',
    title: 'HISTORY',
    intro: 'history', // intro가 있다면 메가메뉴/푸터에 서브메뉴는 노출하고 GNB는 클릭시 해당 router name으로 이동한다
    children: [
      {
        name: 'history',
        title: '역사관'
      }
    ]
  },
  {
    name: 'media',
    title: 'MEDIA',
    children: [
      {
        name: 'media',
        title: '공지사항'
      },
      {
        name: 'mediaNews',
        title: '구단소식'
      },
      {
        name: 'mediaPhoto',
        title: '경기사진'
      },
      {
        name: 'mediaWallpaper',
        title: '바탕화면'
      },
      {
        name: 'mediaVideo',
        title: '구단영상'
      }
    ]
  },
]

export default menu