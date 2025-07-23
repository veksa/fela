import {createContext} from 'react';
import {IFelaRenderer} from './fela.interface';

export const FelaRendererContext = createContext<IFelaRenderer | undefined>(undefined);
