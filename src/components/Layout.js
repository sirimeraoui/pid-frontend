import { Drawer, Typography, List, ListItem, ListItemIcon, Box, ListItemText, ListItemButton, Toolbar, Divider } from '@mui/material';
import AppBarC from './AppBarC';
import StorageIcon from '@mui/icons-material/Storage';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
// import { Children} from 'react';





const drawerWidth = '25%';

// const classes= useStyles();
function Layout({ children }) {
    return (
        <Box
            sx={{
                flexGrow: 1
            }}>
            <Box
                sx={{
                    width: `calc(100% - ${drawerWidth})`,
                    marginLeft: drawerWidth,
                }}
            >
                <AppBarC /></Box>
            {/* drawer */}

            <Drawer
                variant='permanent'
                anchor="left"
                PaperProps={{
                    sx: {
                        width: drawerWidth,
                        boxShadow: '2px 2px 20px 0 rgb(39 28 28 / 12%)',
                    }
                }}

            >
                <Toolbar>
                    <Typography variant="h5" >
                        Entities
                    </Typography>
                </Toolbar>

                <Divider />

                <List>
                    {/* Portion navigation */}
                    {React.Children.map(children.props.children,
                        (child, i) => {
                            if (child.props && (child.props.path.search('/new') === -1 && child.props.path.search((/\/$/)) === -1)) {
                                return (<ListItem
                                    disablePadding
                                    key={i}
                                    component={Link}
                                    to={child.props ? child.props.path : "/"}
                                >
                                    {/* {console.log(child.props)} */}
                                    <ListItemButton>
                                        <ListItemIcon> <StorageIcon /> </ListItemIcon>
                                        <ListItemText primary={child.props ? child.props.path.slice(1) : null} />
                                    </ListItemButton>
                                </ListItem>
                                )
                            }
                        }
                    )}
                </List>
            </Drawer>

            <Box
                sx={{
                    width: `calc(100% - ${drawerWidth})`,
                    marginLeft: drawerWidth,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default Layout;