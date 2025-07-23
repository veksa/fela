import {assignStyle} from 'css-in-js-utils';
import {StyleObject} from 'css-in-js-utils/es/cssifyObject';
import {IStyle} from 'fela';

type IStrictStyleWithClassName<StyleKeys extends IStyle> = StyleKeys & {
    _className?: string;
};

const resolveRule = <StyleKeys extends IStyle>(rule: IStrictStyleWithClassName<StyleKeys> | IStrictStyleWithClassName<StyleKeys>[]): IStrictStyleWithClassName<StyleKeys> => {
    if (Array.isArray(rule)) {
        return resolveRule<StyleKeys>(combineRules([...rule] as IStrictStyleWithClassName<StyleKeys>[]));
    }

    return rule;
};

export function combineRules<A, StyleKeys>(a: StyleKeys): StyleKeys;
export function combineRules<A, B, StyleKeys>(a: StyleKeys, b: StyleKeys): StyleKeys;
export function combineRules<A, B, C, StyleKeys>(a: StyleKeys, b: StyleKeys, c: StyleKeys): StyleKeys;
export function combineRules<A, B, C, D, StyleKeys>(a: StyleKeys, b: StyleKeys, c: StyleKeys, d: StyleKeys): StyleKeys;

export function combineRules<StyleKeys extends IStyle>(...rules: StyleKeys[]): StyleKeys {
    if (rules.length === 1) {
        return resolveRule<StyleKeys>(rules[0]);
    }

    let style = {
        _className: undefined,
    } as IStrictStyleWithClassName<StyleKeys>;

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        const resolvedRule = resolveRule(rule);

        // special combination of our special _className key
        if (resolvedRule && style._className) {
            const resolvedClassName = resolvedRule._className
                ? ' ' + resolvedRule._className
                : '';

            resolvedRule._className = style._className + resolvedClassName;
        }

        style = assignStyle(style as StyleObject, resolvedRule as StyleObject) as IStrictStyleWithClassName<StyleKeys>;
    }

    return style;
}
