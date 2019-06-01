import CustomThemes from './types';
import { createMuiTheme } from '@material-ui/core/styles';

const ThemeOne: CustomThemes = {
    palette: {
        primary: {
            light: '#fff',
            main: 'rgb(23, 105, 170)',
            dark: '#000'
        },
        secondary: {
            main: '#f44336',
        },
    },
    typography: { 
        useNextVariants: true
    }
}

export default createMuiTheme(ThemeOne);