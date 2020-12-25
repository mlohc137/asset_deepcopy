import React, {useRef, useState, useEffect} from 'react'
import { Transition } from '@headlessui/react'

interface AddressListProps {
    addresses: Array<string>;
    removeAddress: (index: number) => void;
    validity: number;
} 
/* addresses && addresses.map() works to check if value is defined
because javascript does not evaluate the second element in a AND
if the first element evaluates to false */

export default function AddressListMenu({ addresses, removeAddress, validity }: AddressListProps) {

    const [show, setShow] = useState(false);
    const [addressFocus, setAddressFocus] = useState(9999);

    const menuRef = useRef<HTMLDivElement>(null);

    const addBounce = ((validity: number) => {
        if (validity == 2) {
            return " animate-bounce-brief";
        }
        else {
            return "";
        }
    });

    const removeAddressHelper = ((event: React.MouseEvent, index: number) => {
        // prevent menu from closing if last address in menu is deleted (since it's technically out of bounds after you delete it)    
        removeAddress(index);
        if (addresses.length != 0) {
            event.stopPropagation();
        }
    });

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Element)) {
                if(!show) return;
                setShow(false);
            }
        };
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [show, menuRef]);
    
    return (
        <div ref={menuRef} className="group inline-block">
            <button className="p-1 w-14 h-14" onClick={() => setShow(!show)}>
                {show && addresses.length != 0
                    ? <svg className="fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
                        <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                      </svg>
                    : <div className="relative">
                        <div className={"absolute top-3 right-2 text-xs rounded-full -mt-1 -mr-2 px-1 font-bold bg-red-700 text-white" + addBounce(validity)}>{addresses.length}</div>
                        <svg className="fill-current text-gray-800 transition duration-500 ease-in-out hover:text-gray-700"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                      </div>    
                }
            </button>
            <ol className="absolute left-0 border-5 rounded-b-lg border-cyan-700 bg-cyan-700 min-w-max">
                <Transition
                    show={show}
                    enter="transition ease-out duration-200 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-150 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {addresses && addresses.map((item, index) => {
                        return(
                            <li key={index} className="relative flex items-center border-5 rounded-lg border-cyan-700 hover:bg-gray-800" 
                                onMouseOver={() => setAddressFocus(index)} onMouseLeave={() => setAddressFocus(9999)}>
                                <span className="mr-8 p-4 sm:text-sm md:text-base">{item}</span>
                                {addressFocus===index && 
                                    <button className="absolute right-2" onClick={(e) => removeAddressHelper(e, index)}>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                }       
                            </li>
                        )
                    })}
                </Transition>
            </ol>
        </div>
    )
}