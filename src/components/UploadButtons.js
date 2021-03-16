import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';

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

const UploadButtons = ({ handleChange, handleUpload }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
            color='primary'
            aria-label='upload picture'
            component='span'
          >
            <PhotoCamera />
          </IconButton>
        </Tooltip>
      </label>
      <Tooltip title='Upload'>
        <IconButton onClick={handleUpload} color='primary' component='span'>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default UploadButtons;
