import {useContext} from 'react';
import {ThemeContext} from 'react-fela';
import {useMemoWith} from './useMemoWith';
import {isEqual} from '../_helpers/isEqual';

export const useTheme = <Theme extends object>() => {
    const theme = useContext(ThemeContext);

    const memoizedTheme = useMemoWith((theme ?? {}) as Theme, isEqual);

    return {
        theme: memoizedTheme,
    };
};
