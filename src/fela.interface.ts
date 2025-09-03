import {IRenderer, IStyle} from 'fela';

export interface IRequiredTheme {
    name: string;
}

export type IRules<Rules extends object, StyleKeys extends IStyle> = {
    [K in keyof Rules]: StyleKeys;
};

export interface IExtendRule<StyleKeys extends IStyle> {
    key: string;
    name: string;
    rule: StyleKeys;
}

export type IExtendRules<Rules extends object, StyleKeys extends IStyle> = {
    [K in keyof Rules]: IExtendRule<StyleKeys>;
};

export type IExtend<Rules extends object, StyleKeys extends IStyle> = Partial<IExtendRules<Rules, StyleKeys>>;

type AllowedPropTypes = string | number | boolean | undefined;

export type AllowedSimpleProps<Props extends object> = {
    [K in keyof Props]: Props[K] extends AllowedPropTypes
        ? Props[K]
        : never;
};

export type AllowedExtendProps<Props extends object, Rules extends object, StyleKeys extends IStyle> =
    AllowedSimpleProps<Props>
    & {extend?: IExtend<Rules, StyleKeys>};

export type StyleProps<Props extends object, Rules extends object, Theme extends IRequiredTheme, StyleKeys extends IStyle> =
    & AllowedExtendProps<Props, Rules, StyleKeys>
    & {theme: Theme};

export type IFelaRenderer = Omit<IRenderer, 'renderRule'> & {
    renderRule(key: string, rule: IExtendRule<object>): string
};

export interface IRuleFn<Rules extends object, Props extends object, Theme extends IRequiredTheme, StyleKeys extends IStyle> {
    (props: StyleProps<Props, Rules, Theme, StyleKeys>, renderer: IFelaRenderer): IRules<Rules, StyleKeys>;
}

export type IClasses<Rules extends object = {}> = {
    [K in keyof Rules]: string;
};

export interface ICachedStyle<Rules extends object, Props extends object, Theme extends IRequiredTheme, StyleKeys extends IStyle> {
    getRules: (props: StyleProps<Props, Rules, Theme, StyleKeys>, renderer: IFelaRenderer) => IExtend<Rules, StyleKeys>;
    getClasses: (props: StyleProps<Props, Rules, Theme, StyleKeys>, renderer: IFelaRenderer) => IClasses<Rules>;
}

export interface IExtendProp<RuleFn extends ICachedStyle<any, any, any, any>> {
    extend?: RuleFn extends ICachedStyle<infer Rules, any, any, infer StyleKeys>
        ? IExtend<Rules, StyleKeys>
        : never;
}
