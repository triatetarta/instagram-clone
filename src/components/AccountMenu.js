import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { auth } from '../firebase';

const AccountMenu = ({ setOpen, setOpenSignIn, user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignup = () => {
    setOpen(true);
    handleClose();
  };

  const handleSignIn = () => {
    setOpenSignIn(true);
    handleClose();
  };

  const handleLogout = () => {
    auth.signOut();
    handleClose();
  };

  return (
    <>
      <Tooltip title='Account'>
        <IconButton
          aria-label='more'
          aria-controls='long-menu'
          aria-haspopup='true'
          onClick={handleClick}
          component='span'
        >
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        {user ? (
          <div>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Account</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleSignup}>Sign Up</MenuItem>
            <MenuItem onClick={handleSignIn}>Login</MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
};

export default AccountMenu;
