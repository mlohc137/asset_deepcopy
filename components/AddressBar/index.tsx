import * as React from 'react'
import Web3Utils from 'web3-utils'
import { useMediaQuery, Paper, Input, Divider, Icon, IconButton,
  makeStyles, createStyles, Theme, createMuiTheme, ThemeProvider 
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddressListMenu from '../AddressListMenu'

interface AddressBarProps {
    addresses: Array<string>;
    addAddress: (address: string) => void;
    removeAddress: (event: React.MouseEvent<EventTarget>, index: number) => void;
}

// Material-UI uses JSS for styling
// No need to provide a theme context, Material UI already uses context passing
// to pass in the theme through the ThemeProvider to all children to access
// using useTheme() Material UI will automatically assign colors and then 
// apply any customizations you make in apply styles (passing in the theme)
const useStyles = makeStyles((theme: Theme) => {
    console.log("This is the Address Bar blue!")
    console.log(theme.palette.primary.main)
    return createStyles({
        root: {
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
        },
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
          '&.Mui-focused': {
            '& .MuiIcon-root':{
              color: theme.palette.primary.main,
              marginRight: theme.spacing(1),
            },
          },
          '&.MuiInput-underline::after': {
            borderBottomColor: theme.palette.primary.main
          },
        },
        validityIcon: {
          marginRight: theme.spacing(1),
        },
    })
  }
);

export default function AddressBar({ addresses, addAddress, removeAddress }: AddressBarProps) {
  const [address, setAddress] = React.useState("")
  const [validity, setValidity] = React.useState(0)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#2196f3'
          },
          success: {
            main: '#4caf50'
          }
        },
      }),
    [prefersDarkMode],
  );

  const classes = useStyles(theme);

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }

  const checkThenAddAddress = () => {
      var checksum = "";
      try {
        checksum = Web3Utils.toChecksumAddress(address)
        addAddress(address)
        setValidity(2)
      }
      catch(err) {
        console.log("setting validity to False!")
        setValidity(1)
      }
  }

  return (
    <div className="flex flex-col w-full">
      <ThemeProvider theme={theme}>
        <Paper component="form" className={classes.root}>
          <AddressListMenu addresses={addresses} removeAddress={removeAddress}/>
          <Input
            type='text'
            className={classes.input}
            placeholder="Enter Ethereum Address"
            error={validity===1}
            inputProps={{ 'aria-label': 'address_input' }}
            onChange={changeAddress}
            endAdornment={
              <Icon className={classes.validityIcon}
                aria-label="validity">
                <CheckCircleIcon/>
              </Icon>
            }
          />
          <Divider orientation="vertical" flexItem/>
          <IconButton className={classes.validityIcon}
            aria-label="add_address"
            onClick={(event) => checkThenAddAddress()}>
            <AddIcon/>
          </IconButton>
        </Paper>
      </ThemeProvider>
    </div>
  );
}

