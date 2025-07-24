import {useContext} from 'react';
import {FelaRendererContext} from '../renderer.context';

export const useFelaRenderer = () => {
    const renderer = useContext(FelaRendererContext);

    if (!renderer) {
        throw Error('No renderer has specified');
    }

    return {
        renderer,
    };
};
