import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Grid, Container } from '@material-ui/core';
import Header from './components/Header/Header';
import Users from './components/Users/Users';
import Repos from './components/Repos/Repos';
import Issues from './components/Issues/Issues';
import Error from './components/Error/Error';
import MissingAuthModal from './components/Modals/MissingAuthModal/MissingAuthModal';

import { githubAuthentification } from './.env.example';

const App = observer(({ store }) => {
  const { showUsers } = store;
  const [showAuthModal, setShowAuthModal ] = useState(false);

  useEffect(() => {
    const { token: accessToken } = githubAuthentification;
    if (!accessToken) {
      setShowAuthModal(true);
    }
  }, [setShowAuthModal]);

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  }

  return (
    <Router>
      <Header store={store} />
      <Container maxWidth="md">
        <Grid container>
          {showUsers && <Users store={store} /> }
          <Switch>
            <Route path="/" exact children={null} />
            <Route path="/:username" exact children={<Repos store={store} />} />
            <Route path="/:username/:reponame" exact children={<Issues store={store} />} />
            <Route path="*" children={<Error message={"404 Page not found"} />} />
          </Switch>
          <MissingAuthModal open={showAuthModal} close={handleCloseAuthModal} />
        </Grid>
      </Container>
    </Router>
  );
});

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
