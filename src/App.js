import React from 'react';
import { CssBaseline, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Post from './Post';

const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: '#fafafa',
    height: '100vh',
  },
  app__header: {
    objectFit: 'contain',
    backgroundColor: '#fff',
    padding: '20px',
  },
  app_headerImage: {},
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <CssBaseline />
      <div className={classes.app__header}>
        <img
          className={classes.app_headerImage}
          src={process.env.PUBLIC_URL + '/assets/instagram.png'}
          alt='instagram logo'
        />
      </div>
      <Divider light />
      <Post />
    </div>
  );
};

export default App;
