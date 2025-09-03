import {StyleProps, IExtendRule, IRequiredTheme} from './fela.interface';
import {IStyle} from 'fela';

export const keyStyleSelector = <SimpleProps extends object, Rules extends object, Theme extends IRequiredTheme, StyleKeys extends IStyle, Props extends StyleProps<SimpleProps, Rules, Theme, StyleKeys>>(
    id: string, props?: Props,
): string => {
    if (props === undefined || Object.keys(props).length === 0) {
        return '--default-style-key--';
    }

    const {theme, extend, ...restProps} = props;

    let propKey = '';

    for (const item in restProps) {
        if (item in restProps) {
            const value = restProps[item as keyof typeof restProps];
            if (typeof value === 'function') {
                console.error('key is a function in useStyle props', item);
            } else if (value !== undefined && value !== null && typeof value === 'object') {
                console.error('key is an object in useStyle props', item);
            } else {
                propKey += String(value);
            }
        }
    }

    const keys = [id];

    if (extend && Object.keys(extend).length) {
        const firstExtend = Object.values(extend)[0] as IExtendRule<StyleKeys>;
        keys.push(firstExtend?.key);
    } else {
        if (theme?.name) {
            keys.push(theme.name);
        }
    }

    if (propKey) {
        keys.push(propKey);
    }

    return keys.join('+');
};
