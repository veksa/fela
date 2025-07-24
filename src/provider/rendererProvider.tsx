import {FC, memo, ReactNode} from 'react';
import {RendererProvider as FelaRendererProvider} from 'react-fela';
import {IFelaRenderer} from '../fela.interface';

interface IRendererProviderProps {
    renderer: IFelaRenderer;
    children: ReactNode;
}

const RendererProviderComponent: FC<IRendererProviderProps> = props => {
    const {renderer, children} = props;

    return (
        <FelaRendererProvider renderer={renderer}>
            {children}
        </FelaRendererProvider>
    );
};

export const RendererProvider =
    memo(RendererProviderComponent);
