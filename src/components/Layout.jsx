import { AppBar, Box, CssBaseline, Stack, Switch, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";

export default function Layout({children}) {
    const [theme, setTheme] = useState(true);
 
    return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <CssBaseline />
        <header>
            <AppBar component="nav" enableColorOnDark>
                <Box>
                    <Typography
                        variant="h4"
                        component="div"
                    >
                    Quiz
                    </Typography>
                </Box>
            </AppBar>
        </header>
        <section>
            <Stack sx={{
                position: 'absolute',
                top: '10%', 
                left: '2%'
            }}>
                <Typography variant="caption">Theme Switch</Typography>
                <Switch checked={theme} size="small" onChange={() => {
                    setTheme(!theme)
                }}/>
            </Stack>
            {children}
        </section>
    </ThemeProvider>
    )
} 