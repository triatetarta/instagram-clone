import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, FormControl, Input } from '@material-ui/core';
import { auth } from '../firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  app__signupImg: {
    width: 100,
    marginBottom: 20,
  },
  app__signup: {
    display: 'flex',
  },
  app__signupInput: {
    marginBottom: 15,
  },
}));

const ModalLogin = ({ openSignIn, setOpenSignIn }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setEmail('');
    setPassword('');
    setOpenSignIn(false);
  };

  return (
    <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
      <div style={modalStyle} className={classes.paper}>
        <center>
          <img
            src={process.env.PUBLIC_URL + 'assets/instagram.png'}
            alt='instagram logo'
            className={classes.app__signupImg}
          />
          <FormControl className={classes.app__signup}>
            <Input
              className={classes.app__signupInput}
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.app__signup}>
            <Input
              className={classes.app__signupInput}
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </FormControl>
        </center>
      </div>
    </Modal>
  );
};

export default ModalLogin;
