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

// const Settings = Loadable({
//   loader: () => import('./views/Settings/Settings'),
//   loading: Loading,
// });

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Companylist = Loadable({
  loader: () => import('./views/Company/Companylist'),
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

  { path: '/company', exact: true, name: 'User', component: Companylist },

  { path: '/course', exact: true, name: 'Course', component: Course },
  { path: '/course/course', name: 'Add Course', component: Course },
  { path: '/course/coursecategory', name: 'Course Category', component: Coursecategory },
  { path: '/course/courselist', name: 'Courses', component: Courselist },
  { path: '/course/lecture/:id', params: { id: '' }, name: 'Lectures', component: Lecture },

  //{ path: '/settings', name: 'Account Settings', component: Settings },

  { path: '/charts', name: 'Charts', component: Charts },
];

export default routes;
