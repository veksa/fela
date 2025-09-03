import {useRenderer} from './useRenderer';
import {useTheme} from './useTheme';
import {IClasses, ICachedStyle, AllowedExtendProps, IExtendRules, IRequiredTheme} from '../fela.interface';
import {useMemoWith} from './useMemoWith';
import {shallowEqual} from '../_helpers/shallowEqual';
import {IStyle} from 'fela';

interface IStylish<Rules extends object, StyleKeys extends IStyle> {
    rules: IExtendRules<Rules, StyleKeys>;
    css: IClasses<Rules>;
}

type IsContainOnlyExtend<Props> = keyof Props extends 'extend'
    ? true
    : 'extend' extends keyof Props
        ? keyof Props extends 'extend' | infer K
            ? [K] extends [never]
                ? true
                : false
            : false
        : false;

type RuleFnInput<RuleFn> = RuleFn extends ICachedStyle<infer Rules, infer Props, infer _Theme, infer StyleKeys>
    ? IsContainOnlyExtend<Props> extends true
        ? [ruleFn: RuleFn, props?: AllowedExtendProps<Props, Rules, StyleKeys>]
        : [ruleFn: RuleFn, props: AllowedExtendProps<Props, Rules, StyleKeys>]
    : never;

type RuleFnOutput<RuleFn> = RuleFn extends ICachedStyle<infer Rules, any, any, infer StyleKeys>
    ? IStylish<Rules, StyleKeys>
    : never;

export function useStyle<S extends ICachedStyle<any, any, any, any>, Theme extends IRequiredTheme>(
    ...args: RuleFnInput<S>
): RuleFnOutput<S> {
    const [cachedStyle, props] = args;

    const {theme} = useTheme<Theme>();
    const {renderer} = useRenderer();

    const rules = cachedStyle.getRules(Object.assign((props ?? {}), {theme}), renderer);
    const css = cachedStyle.getClasses(Object.assign((props ?? {}), {theme}), renderer);

    const memoizedRules = useMemoWith(rules, shallowEqual);
    const memoizedCss = useMemoWith(css, shallowEqual);

    return {
        rules: memoizedRules,
        css: memoizedCss,
    } as RuleFnOutput<S>;
}
