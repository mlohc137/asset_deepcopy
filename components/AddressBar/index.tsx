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

export default function AddressBar({ addresses, addAddress, removeAddress }: AddressBarProps) {
  const [address, setAddress] = React.useState("")
  const [validity, setValidity] = React.useState(0)

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
  //AddressListMenu addresses={addresses} removeAddress={removeAddress}/> 

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="relative flex flex-row w-full items-center border-5 rounded-lg focus-within:border-indigo-700 border-blue-800 focus-within:bg-indigo-700 bg-blue-800">
        <span className="flex-none w-14 pt-1 pr-1 pb-1 pl-2">
            <AddressListMenu addresses={addresses} removeAddress={removeAddress}/>
        </span>
        <div className="flex-grow p-3">
          <input type="text" name="address_input" id="address_input"
            className="group flex-1 w-full p-2 block border-5 rounded-lg focus:border-indigo-700 border-blue-800 sm:text-sm md:text-base"
            placeholder="Enter Ethereum Address to Add" onChange={changeAddress}/>
        </div>
        <span className="flex-none w-14 pt-2 pr-1.5 pb-1.5 pl-1.5">
          <svg className="fill-current text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </span>
        <span className="flex-none w-14">
          <button className="pt-0.5" id="add_address" onClick={(event) => checkThenAddAddress()}>
            <svg className="fill-current text-green-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
}

