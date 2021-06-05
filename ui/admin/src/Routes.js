import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './common/Layout';
import Dashboard from './components/dashboard/Dashboard';
import PostsList from './components/posts/PostsList';
import NewPost from './components/posts/NewPost';
import EditPost from './components/posts/EditPost';
import ServicesList from './components/services/ServicesList';
import NewService from './components/services/NewService';
import EditService from './components/services/EditService';
import CategoriesList from './components/categories/CategoriesList';
import NewCategory from './components/categories/NewCategory';
import EditCategory from './components/categories/EditCategory';
import Gallery from './components/gallery/Gallery';
import Settings from './components/settings/Settings';

const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/posts" exact component={PostsList} />
      <Route path="/posts/new" exact component={NewPost} />
      <Route path="/posts/:id" component={EditPost} />
      <Route path="/categories" exact component={CategoriesList} />
      <Route path="/categories/new" exact component={NewCategory} />
      <Route path="/categories/:id" component={EditCategory} />
      <Route path="/services" exact component={ServicesList} />
      <Route path="/services/new" exact component={NewService} />
      <Route path="/services/:id" component={EditService} />
      <Route path="/gallery" exact component={Gallery} />
      <Route path="/settings" exact component={Settings} />
    </Switch>
  </Layout>
);

export default Routes;
