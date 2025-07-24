import {useContext} from 'react';
import {RendererContext} from 'react-fela';
import {IFelaRenderer} from "../fela.interface";

export const useRenderer = () => {
    const renderer = useContext(RendererContext) as unknown as IFelaRenderer;

    if (!renderer) {
        throw Error('No renderer has specified');
    }

    return {
        renderer,
    };
};
