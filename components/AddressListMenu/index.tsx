import React from 'react'
//import Avatar from '@material-ui/core/Avatar';

interface AddressListProps {
    addresses: Array<string>;
    removeAddress: (event: React.MouseEvent<EventTarget>, index: number) => void;
} 
/* addresses && addresses.map() works to check if value is defined
because javascript does not evaluate the second element in a AND
if the first element evaluates to false */

export default function AddressListMenu({ addresses, removeAddress }: AddressListProps) {

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
        <div className="group inline-block">
            <button className="pl-1.5 p-1">
              <svg className="fill-current" 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
              </svg>
            </button>
            <ol className="border rounded-sm transform scale-0 group-hover:scale-100 absolute 
                left-0 transition duration-700 ease-in-out origin-top min-w-max">
                {addresses && addresses.map((item, index) => {
                    return(
                        <li key={index} className="hover:bg-gray-700">
                            <span className="pr-1">{item}</span>
                            <button className="mr-auto">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}