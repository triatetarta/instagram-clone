import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import { CardContent } from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase';

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '100%',
  },
  bookmark: {
    marginLeft: 'auto',
  },
  commentForm: {
    display: 'flex',
  },
  inputForm: {
    flex: 1,
  },
  buttonForm: {
    flex: 0,
  },
}));

const Post = ({
  postId,
  location,
  caption,
  imageUrl,
  username,
  avatarUrl,
  user,
}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const classes = useStyles();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={username} src={avatarUrl} />}
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={username}
        subheader={location}
      />
      <CardMedia className={classes.media} image={imageUrl} title={username} />

      <CardActions disableSpacing>
        <IconButton disabled={!user}>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <IconButton disabled={!user}>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <IconButton disabled={!user}>
          <ShareOutlinedIcon />
        </IconButton>
        <IconButton className={classes.bookmark} disabled={!user}>
          <BookmarkBorderOutlinedIcon />
        </IconButton>
      </CardActions>

      <CardContent>
        {caption && (
          <>
            <Typography variant='subtitle2' display='inline'>
              {username}:
            </Typography>
            <Typography variant='caption'> {caption}</Typography>
          </>
        )}

        <div>
          {comments.map((comment, index) => {
            return (
              <p key={index}>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            );
          })}
        </div>

        <form className={classes.commentForm}>
          <Input
            disabled={!user}
            className={classes.inputForm}
            type='text'
            value={comment}
            placeholder='Add a comment'
            inputProps={{ 'aria-label': 'description' }}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className={classes.buttonForm}
            type='submit'
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Post;
