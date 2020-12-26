import * as React from 'react'
import Web3Utils from 'web3-utils'
import AddressListMenu from '../AddressListMenu'

interface AddressBarProps {
    addresses: Array<string>;
    addAddress: (address: string) => void;
    removeAddress: (index: number) => void;
}

export default function AddressBar({ addresses, addAddress, removeAddress }: AddressBarProps) {
  const [address, setAddress] = React.useState("");
  const [validity, setValidity] = React.useState(0);
  const [inputMessage, setInputMessage] = React.useState("");

  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const validityIconClass = (validity: number) => {
    switch(validity) {
      case 0:
        return "transition duration-500 ease-in-out fill-current text-gray-800";
      case 1:
        return "transition duration-500 ease-in-out fill-current text-red-600";
      case 2:
        return "transition duration-500 ease-in-out fill-current text-lime-500";
    }
  };

  const inputRingClass = (validity: number) => {
    switch(validity) {
      case 0:
        return " transition duration-500 ease-in-out";
      case 1:
        return " transition duration-500 ease-in-out ring-2 ring-red-600";
      case 2:
        return " transition duration-500 ease-in-out ring-2 ring-lime-600";
    }
  };

  // added pointer-events-none to the input message div so it doesn't interfere with dropdown menu hover
  const inputMessageClass = (validity: number) => {
    switch(validity) {
      case 0:
        return " transition duration-500 ease-linear fill-current text-cyan-700";
      case 1:
        return " transition duration-500 ease-linear fill-current text-red-600";
      case 2:
        return " transition duration-500 ease-linear fill-current text-lime-500";
    }
  };

  const checkThenAddAddress = () => {
      var checksum = "";
      try {
        checksum = Web3Utils.toChecksumAddress(address);
        if (addresses.includes(address)) {
          setValidity(1);
          setInputMessage("Address Already Exists in Portfolio!")
        }
        else {
          addAddress(address);
          setValidity(2);
          setInputMessage("Address Added to Portfolio!")
        }
      }
      catch(err) {
        setValidity(1);
        setInputMessage("Invalid Ethereum Address!")
      }
  };

  React.useEffect(() => {
    if (validity != 0) {
      setTimeout(() => { 
        setValidity(0)
        setInputMessage("")
      }, 1200)
    }
  }, [validity]);

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="relative flex flex-row w-full items-center bg-cyan-700 border-5 rounded-lg border-cyan-700">
        <span className="flex-none w-14 pt-1 pr-1 pb-1 pl-2">
            <AddressListMenu addresses={addresses} removeAddress={removeAddress} validity={validity}/>
        </span>
        <div className="flex-grow pt-3 pb-3 pr-0 pl-4">
          <input type="text" name="address_input" id="address_input"
            className={"group flex-1 w-full p-2.5 block bg-gray-800 hover:bg-gray-700 border-3 rounded-lg border-cyan-700 bottom-40 left-40 text-primary sm:text-sm md:text-base outline-none" + inputRingClass(validity)}
            placeholder="Enter Ethereum Address to Add" onChange={changeAddress}/>
        </div>
        <span className="flex-none w-14 mr-1 pt-2 pb-1.5 pr-1.5 pl-1.5">
          <svg className={validityIconClass(validity)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </span>
        <span className="flex-none w-14 mr-1">
          <button className="pt-0.5" id="add_address" onClick={(event) => checkThenAddAddress()}>
            <svg className="fill-current text-teal-500 transition duration-500 ease-in-out hover:text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 19">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </button>
        </span>
      </div>
      <div className="relative flex flex-row w-full h-10 z-0 pointer-events-none">
        <p className={"absolute right-10" + inputMessageClass(validity)}>{inputMessage}</p>
      </div>
    </div>
  );
}

