import React, { useEffect, useState } from 'react';
import { CssBaseline, Divider, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Post from './Post';
import { db } from './firebase';

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
  mb: {
    marginBottom: '4rem',
  },
}));

const App = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

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
      <Divider light className={classes.mb} />
      <Grid container>
        <Grid item xs={1} sm={2} lg={4} />
        <Grid item xs={10} sm={8} lg={4}>
          <Grid container spacing={3} justify='center'>
            {posts.map((post, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <Post {...post} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={1} sm={2} lg={4} />
      </Grid>
    </div>
  );
};

export default App;
