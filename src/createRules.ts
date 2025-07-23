import {normalizeStyleName} from './_helpers/normalizeStyleName';
import {v4} from 'uuid';
import {ICachedStyle, IRules, IClasses, StyleProps, IRuleFn, IExtendRules, IFelaRenderer} from './fela.interface';
import {keyStyleSelector} from './keyStyleSelector';
import {combineRules} from './combineRules';
import {IStyle} from 'fela';

export function createRules<Props extends object, Rules extends object, Theme extends object, StyleKeys extends IStyle>(
    ruleFn: IRuleFn<Rules, Props, Theme, StyleKeys>,
): ICachedStyle<Rules, Props, Theme, StyleKeys> {
    const id = v4();

    const rulesCache = {} as Record<string, IRules<Rules, StyleKeys>>;
    const extendRulesCache = {} as Record<string, IExtendRules<Rules, StyleKeys>>;
    const classesCache: Record<string, IClasses<Rules>> = {};

    const funcName = process.env['NODE_ENV'] === 'development'
        ? normalizeStyleName(ruleFn.name)
        : undefined;

    const generateRules = (key: string, renderer: IFelaRenderer, props: StyleProps<Props, Rules, Theme, StyleKeys>) => {
        if (rulesCache[key] !== undefined) {
            return rulesCache[key];
        }

        rulesCache[key] = ruleFn(props, renderer);

        return rulesCache[key];
    };

    const getRules = (props: StyleProps<Props, Rules, Theme, StyleKeys>, renderer: IFelaRenderer) => {
        const {extend} = props ?? {};

        const key = keyStyleSelector(id, props);
        const rules = generateRules(key, renderer, props);

        if (extendRulesCache[key] !== undefined) {
            return extendRulesCache[key];
        }

        const result = {} as IExtendRules<Rules, StyleKeys>;

        const keys = Object.keys(rules) as (keyof typeof rules)[];

        for (const ruleName of keys) {
            const extendValue = extend
                ? extend[ruleName as keyof typeof extend]
                : undefined;
            const safeExtendRule = extendValue?.rule as StyleKeys || {};

            const combinedRule = extend && extendValue
                ? combineRules(rules[ruleName], safeExtendRule)
                : rules[ruleName];

            result[ruleName] = {
                key: `${String(key)}+${String(ruleName)}`,
                name: extendValue?.name
                    ? `${extendValue.name}_${funcName}`
                    : funcName || '',
                rule: combinedRule,
            };
        }

        extendRulesCache[key] = result;

        return result;
    };

    const getClasses = (props: StyleProps<Props, Rules, Theme, StyleKeys>, renderer: IFelaRenderer) => {
        const {extend = {}, ...restProps} = props ?? {};
        const nextProps = {...restProps, extend} as StyleProps<Props, Rules, Theme, StyleKeys>;

        const key = keyStyleSelector(id, props);

        if (classesCache[key] !== undefined) {
            return classesCache[key];
        }

        classesCache[key] = {} as IClasses<Rules>;

        const rules = getRules(nextProps, renderer);
        const ruleKeys = Object.keys(rules) as (keyof typeof rules)[];

        for (const ruleKey of ruleKeys) {
            classesCache[key][ruleKey] = renderer.renderRule(ruleKey as string, rules[ruleKey]);
        }

        return classesCache[key];
    };

    return {
        getRules,
        getClasses,
    };
}
