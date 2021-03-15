import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebase from 'firebase';
import { storage, db } from './firebase';
import { Button } from '@material-ui/core';

function CircularProgressWithLabel(props) {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress variant='determinate' {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='caption'
          component='div'
          color='textSecondary'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  bar: {
    width: '20%',
  },
}));

const ImageUpload = ({ username }) => {
  const classes = useStyles();
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
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
          });
      }
    );
  };

  return (
    <div>
      <CircularProgressWithLabel value={progress} />
      <input
        type='text'
        placeholder='Enter a Caption'
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type='file' onChange={handleChange} />
      <Button onClick={handleUpload} variant='contained' color='primary'>
        +
      </Button>
    </div>
  );
};

export default ImageUpload;
