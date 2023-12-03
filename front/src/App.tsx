import {BrowserRouter} from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode.tsx";
import {AuthServiceProvider} from "./context/AuthServiceProvider.tsx";
import {AppRouter} from "./routing/AppRouter.tsx";


const App = () => (
    <BrowserRouter>
        <AuthServiceProvider>
            <ToggleColorMode>
                <AppRouter/>
            </ToggleColorMode>
        </AuthServiceProvider>
    </BrowserRouter>
);

export default App
