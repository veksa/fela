import {FC, memo, ReactNode} from 'react';
import {IFelaRenderer} from '../fela.interface';
import {FelaRendererContext} from '../renderer.context';

interface IFelaRendererProviderProps {
    renderer: IFelaRenderer;
    children: ReactNode;
}

const FelaRendererProviderComponent: FC<IFelaRendererProviderProps> = props => {
    const {renderer, children} = props;

    return (
        <FelaRendererContext value={renderer}>
            {children}
        </FelaRendererContext>
    );
};

export const FelaRendererProvider =
    memo(FelaRendererProviderComponent);
