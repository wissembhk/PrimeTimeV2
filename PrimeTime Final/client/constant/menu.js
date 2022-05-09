export const MENUITEMS = [
   {
      title: 'Home', type: 'sub', children: [
         { path: '/', title: 'Home', type: 'link' },
        
      ],
   },
   {
      title: 'Shop', type: 'sub', children: [
         // { path: '/blog/blog-detail/detail-left-sidebar', title: ' ', type: 'link' },
          { path: '/product/products', title: 'Our Products', type: 'link' },
          { path: '/cart',title: 'Cart', type: 'link' , icon: 'fa fa-'},
      ]
   },
   {
      title: 'Live shows', type: 'sub', children: [
         // { path: '/blog/blog-detail/detail-left-sidebar', title: ' ', type: 'link' },
          { path: '/streams/launchStream', title: 'Launch Stream', type: 'link' },
          { path: '/streams',title: 'Watch Stream', type: 'link' , icon: 'fa fa-'},
          { path: '/karaoke',title: 'Karaoke', type: 'link' , icon: 'fa fa-'}
         ]
   },

   {
      title: 'Courses', type: 'sub', children: [
          { path: '/courses/courses', title: 'Our Courses', type: 'link' }
         ]
   }
   
]
