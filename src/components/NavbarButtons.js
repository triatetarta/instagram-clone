import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import AccountMenu from './AccountMenu';
import firebase from 'firebase';
import { storage, db } from '../firebase';
import CustomizedSnackbar from './Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const NavbarButtons = ({ setOpen, setOpenSignIn, user, username }) => {
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsLoaded(true);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setImage(null);
            setCaption('');
            setIsLoaded(false);
          });
      }
    );
  };

  return user ? (
    <div className={classes.root}>
      <CustomizedSnackbar isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      <input
        accept='image/*'
        className={classes.input}
        id='icon-button-file'
        type='file'
        onChange={handleChange}
      />
      <label htmlFor='icon-button-file'>
        <Tooltip title='New Post'>
          <IconButton
            aria-label='upload picture'
            component='span'
            disabled={image ? true : false}
          >
            <PhotoCamera />
          </IconButton>
        </Tooltip>
      </label>
      <Tooltip title='Upload'>
        <IconButton onClick={handleUpload} component='span'>
          <SendIcon />
        </IconButton>
      </Tooltip>
      <AccountMenu
        setOpen={setOpen}
        setOpenSignIn={setOpenSignIn}
        user={user}
      />
    </div>
  ) : (
    <AccountMenu setOpen={setOpen} setOpenSignIn={setOpenSignIn} user={user} />
  );
};

export default NavbarButtons;
