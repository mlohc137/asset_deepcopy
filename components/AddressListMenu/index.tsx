import React from 'react'
//import Avatar from '@material-ui/core/Avatar';
import { List, ListItem, ListItemText, ListItemSecondaryAction,
Box, Paper, IconButton, ClickAwayListener, Grow, Popper,
useTheme, Theme, createStyles, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
//import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

interface AddressListProps {
    addresses: Array<string>;
    removeAddress: (event: React.MouseEvent<EventTarget>, index: number) => void;
} 
/* addresses && addresses.map() works to check if value is defined
because javascript does not evaluate the second element in a AND
if the first element evaluates to false */

export default function AddressListMenu({ addresses, removeAddress }: AddressListProps) {
    const theme = useTheme()
    //console.log("This is the Menu Blue!")
    //console.log(theme.palette.primary.main)
    const useStyles = makeStyles((theme) => {
        console.log("This is the Menu Blue in useStyles!")
        console.log(theme.palette.primary.main)
        return createStyles({
                    menuToggle: {
                        color: theme.palette.primary.main,
                        padding: 10
                    },
                })
    });

    const classes = useStyles(theme);
    console.log("CLASSES")
    console.log(classes)
    console.log("CLASSESMENUTOGGLE")
    console.log(classes.menuToggle)

    const [show, setShow] = React.useState(false);

    const dropdownRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setShow((prevShow) => !prevShow);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (dropdownRef.current && dropdownRef.current.contains(event.target as HTMLElement)) {
          return;
        }
        setShow(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setShow(false);
        }
    };
    // return focus to the button when we transitioned from !show -> show
    // useEffect used to run code to rerender upon a value changing
    const prevShow = React.useRef(show);
    React.useEffect(() => {
        if (prevShow.current === true && show === false) {
        dropdownRef.current!.focus();
        }
        prevShow.current = show;
    }, [show]);

    
    return (
        <Box>
            <IconButton
                ref={dropdownRef}
                aria-controls={show ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                className={classes.menuToggle}
                onClick={handleToggle}
            >
                <MenuIcon />
            </IconButton>
            <Popper open={show} anchorEl={dropdownRef.current} role={undefined} transition disablePortal
                placement="bottom-start">
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <List id="menu-list-grow">
                            {addresses && addresses.map((item, index) => {
                                return (
                                    <ListItem key={`folio-item-${index}`}>
                                        <ListItemText primary={item} key={`folio-item-text-${index}`}/>
                                        <ListItemSecondaryAction>                                        
                                            <IconButton 
                                                edge="end" key={`folio-item-del-${index}`}
                                                onClick={(event) => removeAddress(event, index)}
                                            >
                                                <HighlightOffIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>    
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </Box>
    )
}