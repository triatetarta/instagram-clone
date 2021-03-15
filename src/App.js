import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, Divider, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Post from './Post';
import { db, auth } from './firebase';
import ModalComp from './ModalComp';
import ModalLogin from './ModalLogin';
import ImageUpload from './ImageUpload';

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
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
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

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}

      <ModalComp
        setEmail={setEmail}
        email={email}
        open={open}
        setOpen={setOpen}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <ModalLogin setOpenSignIn={setOpenSignIn} openSignIn={openSignIn} />

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <>
          <Button onClick={() => setOpen(true)}>Signup</Button>
          <Button onClick={() => setOpenSignIn(true)}>Login</Button>
        </>
      )}

      <Grid container>
        <Grid item xs={1} sm={2} lg={4} />
        <Grid item xs={10} sm={8} lg={4}>
          <Grid container spacing={3} justify='center'>
            {posts.map(({ id, post }) => (
              <Grid key={id} item xs={12}>
                <Post {...post} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} sm={2} lg={4} />
      </Grid>
    </div>
  );
};

export default App;
