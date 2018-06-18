import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';
import Login from './views/Pages/Login';
//import Cms from './views/Settings/Cms';

function Loading() {
  return <div>Loading...</div>;
}


const Students = Loadable({
  loader: () => import('./views/user/Students'),
  loading: Loading,
});

const Owner = Loadable({
  loader: () => import('./views/user/Owner'),
  loading: Loading,
});

const Instructor = Loadable({
  loader: () => import('./views/user/Instructor'),
  loading: Loading,
});

const Userlist = Loadable({
  loader: () => import('./views/user/Userlist'),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Course = Loadable({
  loader: () => import('./views/Course/Courses'),
  loading: Loading,
});

const Courselist = Loadable({
  loader: () => import('./views/Course/Courselist'),
  loading: Loading,
});

const Lecture = Loadable({
  loader: () => import('./views/Course/Lecture'),
  loading: Loading,
});

const Coursecategory = Loadable({
  loader: () => import('./views/Course/Coursecategory'),
  loading: Loading,
});

 const Sitesetting = Loadable({
   loader: () => import('./views/Settings/Sitesetting'),
   loading: Loading,
 });

 const Subspackage = Loadable({
  loader: () => import('./views/Settings/Subspackage'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Companylist = Loadable({
  loader: () => import('./views/Company/Companylist'),
  loading: Loading,
});

const Notification = Loadable({
  loader: () => import('./views/Eventsengine/Notification'),
  loading: Loading,
});

const History = Loadable({
  loader: () => import('./views/Eventsengine/History'),
  loading: Loading,
});

const Pending = Loadable({
  loader: () => import('./views/Eventsengine/Pending'),
  loading: Loading,
});

const Eventslist = Loadable({
  loader: () => import('./views/Events/Eventslist'),
  loading: Loading,
});
const Couponslist = Loadable({
  loader: () => import('./views/Coupons/Couponslist'),
  loading: Loading,
});
const Aboutus = Loadable({
  loader: () => import('./views/CMSmanagement/Aboutus'),
  loading: Loading,
});

const Contactus = Loadable({
  loader: () => import('./views/CMSmanagement/Contactus'),
  loading: Loading,
});

const Templates = Loadable({
  loader: () => import('./views/Email/Templates'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  //{ path: '/cms', name: 'Cms', component: Cms },

  { path: '/user', exact: true, name: 'User', component: Userlist },
  { path: '/user/students', name: 'Students', component: Students },
  { path: '/user/owner', name: 'Owner', component: Owner },
  { path: '/user/instructor', name: 'Instructor', component: Instructor },

  { path: '/eventsengine', exact: true, name: 'Events', component: Notification },
  { path: '/eventsengine/notification', name: 'Notification', component: Notification },
  { path: '/eventsengine/history', name: 'History', component: History },
  { path: '/eventsengine/pending', name: 'Pending', component: Pending },

  //{ path: '/events', exact: true, name: 'Events', component: Eventslist },
  { path: '/coupons/list', exact: true, name: 'Coupons', component: Couponslist },
  { path: '/events/list', exact: true, name: 'Events', component: Eventslist },
  { path: '/company', exact: true, name: 'User', component: Companylist },

  { path: '/emailtemplate', exact: true, name: 'Email Templates', component: Templates },

  { path: '/cms', exact: true, name: 'CMS Management', component: Aboutus },
  { path: '/cms/aboutus', name: 'About us', component: Aboutus },
  { path: '/cms/contactus', name: 'Contact Us', component: Contactus },

  { path: '/course', exact: true, name: 'Course', component: Course },
  { path: '/course/course', name: 'Add Course', component: Course },
  { path: '/course/coursecategory', name: 'Course Category', component: Coursecategory },
  { path: '/course/courselist', name: 'Courses', component: Courselist },
  { path: '/course/lecture/:id', params: { id: '' }, name: 'Lectures', component: Lecture },
  { path: '/settings/sitesetting', exact: true, name: 'Site Setting', component: Sitesetting },
  { path: '/settings/subspackage', exact: true, name: 'Subscription Package', component: Subspackage },

  //{ path: '/settings', name: 'Account Settings', component: Settings },

  { path: '/charts', name: 'Charts', component: Charts },
];

export default routes;
