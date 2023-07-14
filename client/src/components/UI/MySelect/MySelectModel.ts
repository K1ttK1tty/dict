import { IOptionState } from '../../../store/storeModels';
export interface IMySelect {
    setIsModal: (state: boolean) => void;
    isSelectOpen:IOptionState;
    setIsSelectOpen:(state: React.SetStateAction<IOptionState>) => void;
}