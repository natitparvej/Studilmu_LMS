
export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        //text: 'NEW',
      },
    },

    {
      name: 'Users',
      url: '/buttons',
      icon: 'icon-people',
      children: [
        {
          name: 'Owners',
          url: '/user/owner',
          // icon: 'icon-user-follow',
        },
        {
          name: 'Instructor',
          url: '/user/instructor',
          // icon: 'icon-user',
        },
        {
          name: 'Students',
          url: '/user/students',
          // icon: 'icon-user-follow',
        },
      ],
    },
   
    
    {
      name: 'Course',
      url: '/buttons',
      icon: 'icon-list',
      children: [
        {
          name: 'Course Category',
          url: '/course/coursecategory',
          // icon: 'icon-user-follow',
        },
      ],
    },

    {
      name: 'Events',
      url: '/buttons',
      icon: 'icon-list',
      children: [
        {
          name: 'Add Events',
          url: '/events/list',
          // icon: 'icon-user-follow',
        },
      ],
    },

    {
      name: 'Events Engine',
      url: '/buttons',
      icon: 'icon-list',
      children: [
        {
          name: 'Notifications',
          url: '/eventsengine/notification',
          // icon: 'icon-user-follow',
        },
        {
          name: 'History',
          url: '/eventsengine/history',
          // icon: 'icon-user',
        },
        {
          name: 'Pending notifications',
          url: '/eventsengine/pending',
          // icon: 'icon-user-follow',
        },
      ],
    },



    {
      name: 'Setting',
      url: '/buttons',
      icon: 'icon-list',
      children: [
        {
          name: 'Site Setting',
          url: '/settings/sitesetting',
          // icon: 'icon-user-follow',
        },
        {
          name: 'Subscription Package',
          url: '/settings/package',
          // icon: 'icon-user',
        },        
      ],
    },




    {
      name: 'CMS',
      url: '/buttons',
      icon: 'icon-list',
      url: '/cms/aboutus',
    },


    {
      name: 'Plan',
      url: 'http://coreui.io/react/',
      icon: 'icon-graph',
      class: 'mt-auto',
    },
    {
      name: 'Help',
      url: 'http://coreui.io/react/',
      icon: 'icon-map',
      
    },
    // {
    //   name: 'Settings',
    //   url: '/settings',
    //   icon: 'icon-settings',
      
    // },

    
  ],
};
