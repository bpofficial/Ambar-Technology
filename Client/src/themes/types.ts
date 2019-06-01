export default interface MuiThemes {
    palette: {
        primary: {
            light: string;
            main: string;
            dark: string;
        };
        secondary: {
            light?: string;
            main: string;
            dark?: string;
        };
    };
    typography: {
        useNextVariants: boolean;
    };
}