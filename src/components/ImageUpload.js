import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { storage, db } from '../firebase';
import UploadButtons from './UploadButtons';

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
      <input
        type='text'
        placeholder='Enter a Caption'
        onChange={(e) => setCaption(e.target.value)}
      />
      <UploadButtons handleUpload={handleUpload} handleChange={handleChange} />
    </div>
  );
};

export default ImageUpload;
