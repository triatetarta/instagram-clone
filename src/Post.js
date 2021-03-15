import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  bookmark: {
    marginLeft: 'auto',
  },
}));

const Post = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt='ThreeQuarters' />}
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title='Three Quarters'
        subheader='London, United Kingdom'
      />
      <CardMedia
        className={classes.media}
        image='https://www.rollingstone.com/wp-content/uploads/2019/10/TheNational.jpg'
        title='the national'
      />

      <CardActions disableSpacing>
        <IconButton>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <IconButton>
          <ShareOutlinedIcon />
        </IconButton>
        <IconButton className={classes.bookmark}>
          <BookmarkBorderOutlinedIcon />
        </IconButton>
      </CardActions>

      <CardContent>
        <Typography variant='subtitle2' display='inline'>
          username:
        </Typography>
        <Typography variant='caption'> caption</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
