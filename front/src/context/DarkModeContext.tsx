import React from 'react';


interface Props {
    toggleColorMode: () => void
}

const DarkModeContext = React.createContext<Props>({
    toggleColorMode: () => {}
})

export default DarkModeContext;