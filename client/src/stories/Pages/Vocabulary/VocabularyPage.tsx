import { IAuthSliceInitialState } from '../../../store/storeModels';

import { dataWithCardsForStatisticsPage } from '../../../Tests/ComponentsTest/TestsConsts';
import Vocabulary from '../../../pages/Vocabulary';
import { WrapInProviderAndRouter } from '../../Helpers/WrapInProviderAndRouter';

const y: any = 9;

export const VocabularyPageWithoutUI = () => {
    return WrapInProviderAndRouter(
        <div style={{ height: '1000px' }}>
            <Vocabulary
                isSelectOpen={{
                    open: false,
                    removeMark: false,
                }}
                setIsSelectOpen={y}
                isAttached={{
                    attach: true,
                    left: '120px',
                    top: '100px',
                }}
                setIsAttached={y}
                selectedColorOrNewLabel={y}
                setSelectedColorOrNewLabel={y}
            />
        </div>,
    );
};
const data: IAuthSliceInitialState = {
    ...dataWithCardsForStatisticsPage,
    cards: [...dataWithCardsForStatisticsPage.data.default.cards],
};
export const VocabularyPageWithCardsUI = () => {
    return WrapInProviderAndRouter(
        <div style={{ height: '1000px' }}>
            <Vocabulary
                isSelectOpen={{
                    open: false,
                    removeMark: false,
                }}
                setIsSelectOpen={y}
                isAttached={{
                    attach: true,
                    left: '120px',
                    top: '100px',
                }}
                setIsAttached={y}
                selectedColorOrNewLabel={null}
                setSelectedColorOrNewLabel={y}
            />
        </div>,
        { AuthSlice: data },
    );
};
