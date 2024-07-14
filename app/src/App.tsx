import {ColorModeContext, Mode, useMode} from './theme.tsx';
import {CssBaseline, Theme, ThemeProvider} from '@mui/material';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import Sidebard from "./components/sidebar/Sidebar.tsx";
import Topbar from "./components/topbar/Topbar.tsx";
import NotFound from "./pages/notfound/NotFound.tsx";
import getTokenDetails from "./auth/TokenDetails.tsx";
import {Login} from "@mui/icons-material";

function App() {
    const navigate = useNavigate();
    const [theme, colorMode] = useMode();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = getTokenDetails();
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setIsAuthenticated(true);
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <ColorModeContext.Provider value={colorMode as { mode: Mode, toggleColorMode: () => void }}>
            <ThemeProvider theme={theme as Theme}>
                <CssBaseline/>
                <div className={'app'}>
                    {isAuthenticated && <Sidebard/>}
                    <main className={'content'}>
                        {isAuthenticated && <Topbar/>}
                        <Routes>
                            <Route path="/" element={<NotFound/>}/>
                            <Route path="/charts" element={<NotFound/>}/>
                            <Route path="/login" element={isAuthenticated ? <NotFound/> : <Login/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
