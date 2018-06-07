
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
    
    // {
    //   name: 'Users',
    //   url: '/user',
    //   icon: 'icon-people',
    // },

    {
      name: 'Users',
      url: '/buttons',
      icon: 'icon-people',
      children: [
        {
          name: 'Students',
          url: '/user/students',
          // icon: 'icon-user',
        },
        {
          name: 'Owners',
          url: '/user/owner',
          // icon: 'icon-user-follow',
        },
      ],
    },
    {
      name: 'Site',
      url: '/buttons',
      icon: 'icon-list',
      children: [
        {
          name: 'Theme',
          url: '/site/theme',
          //icon: 'icon-user',
        },
        {
          name: 'Navigation',
          url: '/site/navigation',
          //icon: 'icon-user-follow',
        },
      ],
    },
    {
      name: 'Sales',
      url: '/buttons',
      icon: 'icon-equalizer',
      children: [
        {
          name: 'Transactions',
          url: '/sales/transactions',
          //icon: 'icon-user',
        },
        {
          name: 'Breakdown',
          url: '/sales/breakdown',
          //icon: 'icon-user-follow',
        },
        {
          name: 'Upsells',
          url: '/sales/upsells',
          //icon: 'icon-user-follow',
        },
      ],
    },
    
    {
      name: 'Category',
      url: '/course/coursecategory',
      icon: 'icon-pie-chart',
    },


    {
      name: 'Add Courses',
      url: '/course/course',
      icon: 'icon-pie-chart',
    },

    {
      name: 'Courses',
      url: '/course/courselist',
      icon: 'icon-pie-chart',
    },


    {
      name: 'Settings',
      url: '/buttons',
      icon: 'icon-equalizer',
      children: [
        {
          name: 'Basic Settings',
          url: '/sales/transactions',
          //icon: 'icon-user',
        },
        {
          name: 'Users',
          url: '/sales/breakdown',
          //icon: 'icon-user-follow',
        },
        {
          name: 'Themes',
          url: '/sales/upsells',
          //icon: 'icon-user-follow',
        },
        {
          name: 'Certifications',
          url: '/sales/upsells',
          //icon: 'icon-user-follow',
        },
        {
          name: 'Gamification',
          url: '/sales/upsells',
          //icon: 'icon-user-follow',
        },
        {
          name: 'E-commerce',
          url: '/sales/upsells',
          //icon: 'icon-user-follow',
        },
        {
          name: 'Domain',
          url: '/sales/upsells',
          //icon: 'icon-user-follow',
        },
        {
          name: 'Subscription',
          url: '/sales/upsells',
          //icon: 'icon-user-follow',
        },
      ],
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
