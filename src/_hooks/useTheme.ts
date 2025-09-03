import {useContext} from 'react';
import {ThemeContext} from 'react-fela';
import {useMemoWith} from './useMemoWith';
import {isEqual} from '../_helpers/isEqual';
import {IRequiredTheme} from '../fela.interface';

export const useTheme = <Theme extends IRequiredTheme>() => {
    const theme = useContext(ThemeContext);

    const memoizedTheme = useMemoWith((theme ?? {}) as Theme, isEqual);

    return {
        theme: memoizedTheme,
    };
};
