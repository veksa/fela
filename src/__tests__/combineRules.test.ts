import {combineRules} from '../combineRules';
import {IStyle} from 'fela';

describe('combineRules', () => {
    test('should create a combined rule', () => {
        const rule: IStyle = {
            color: 'red',
            fontSize: 12,
            lineHeight: 10,
            paddingLeft: 10,
        };

        const anotherRule: IStyle = {
            backgroundColor: 'blue',
            lineHeight: 20,
            paddingLeft: 20,
        };

        const actual = combineRules(rule, anotherRule);

        const expected: IStyle = {
            color: 'red',
            backgroundColor: 'blue',
            fontSize: 12,
            lineHeight: 20,
            paddingLeft: 20,
        };

        expect(actual).toEqual(expected);
    });

    test('should merge _className as a special key', () => {
        const rule: IStyle = {
            _className: 'foo bar',
            color: 'red',
            padding: 10,
        };

        const anotherRule: IStyle = {
            _className: 'baz',
            backgroundColor: 'blue',
            padding: 20,
        };

        const actual = combineRules(rule, anotherRule);

        const expected: IStyle = {
            _className: 'foo bar baz',
            color: 'red',
            backgroundColor: 'blue',
            padding: 20,
        }

        expect(actual).toEqual(expected);
    });
});
