import CardsControl from '../../components/UI/CardsControl/CardsControl';

import { authorizationData } from '../../Tests/ComponentsTest/TestsConsts';
import { WrapInProviderAndRouter } from '../Helpers/WrapInProviderAndRouter';

const y: any = 8;
export const AttachedCardsControlUI = () => {
    return WrapInProviderAndRouter(
        <CardsControl
            modalAdd={y}
            isAttached={{ attach: true, top: '0', left: '0' }}
            setIsAttached={y}
            setIsModal={y}
            selectedColorOrNewLabel={y}
            setIsAddCardModal={y}
            setIsSelectOpen={y}
            isSelectOpen={y}
            setSelectedColorOrNewLabel={y}
            setIsDictionaryModal={y}
        />,
    );
};
export const NotAttachedCardsControlUI = () => {
    return WrapInProviderAndRouter(
        // <div className="buttonPadiingBackground">
            <CardsControl
                modalAdd={y}
                isAttached={{ attach: false, top: '0', left: '0' }}
                setIsAttached={y}
                setIsModal={y}
                selectedColorOrNewLabel={y}
                setIsAddCardModal={y}
                setIsSelectOpen={y}
                isSelectOpen={y}
                setSelectedColorOrNewLabel={y}
                setIsDictionaryModal={y}
            />
        // </div>
        ,
        { AuthSlice: authorizationData },
    );
};
