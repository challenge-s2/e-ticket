import React, { useState } from 'react';
import styles from "./MenuMobile.module.scss"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MenuMobile = ({setOpen}) => {

    return (
        <>
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" onClick={() => setOpen(true)} sx={{backgroundColor: '#80c887' }}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
        </>
    );
}

export default MenuMobile;