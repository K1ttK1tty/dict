import { IOptionState } from '../../../store/storeModels';

import { TColorsOnCard } from '../../../models/models';

export interface IMySelect {
    setIsModal: (state: boolean) => void;
    isSelectOpen: IOptionState;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
    setSelectedColorOrNewLabel: (state: React.SetStateAction<TSelectColorOrNew | null>) => void;
    selectedColorOrNewLabel: TSelectColorOrNew | null;
}
export interface ISetSelectedColor {
    setSelectedColorOrNewLabel: (state: React.SetStateAction<TSelectColorOrNew | null>) => void;
    setIsSelectOpen: (state: React.SetStateAction<IOptionState>) => void;
}
export type TSelectColorOrNew = 'new' | TColorsOnCard | 'Избранное';
