import { FC, memo } from 'react';

import { useAppSelector } from '../../../hooks/redux';

import defaultAvatar from '../../../pages/Icons/defaultAvatar.svg';
import { IAvatarProps } from './AvatarModels';

const Avatar: FC<IAvatarProps> = memo(function ({ styles }) {
    const { avatar } = useAppSelector(state => state.AuthSlice);
    const source = avatar ? avatar : defaultAvatar;
    return <img className={styles} src={source} alt="Аватар" />;
});
export default Avatar;
