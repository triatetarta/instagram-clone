import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Container, CssBaseline } from '@material-ui/core';
import NavbarButtons from './NavbarButtons';

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: '#fafafa',
  },
  app__header: {
    objectFit: 'contain',
    backgroundColor: '#fff',
    padding: '20px',
  },
  mb: {
    marginBottom: '4rem',
  },
  app_headerImage: {
    marginRight: 'auto',
  },
}));

const Navbar = ({ setOpen, setOpenSignIn, user, username }) => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <CssBaseline />
      <Container>
        <AppBar position='static' elevation={0}>
          <Toolbar className={classes.app__header}>
            <img
              className={classes.app_headerImage}
              src={process.env.PUBLIC_URL + '/assets/instagram.png'}
              alt='instagram logo'
            />
            <NavbarButtons
              username={username}
              setOpen={setOpen}
              setOpenSignIn={setOpenSignIn}
              user={user}
            />
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
};

export default Navbar;
