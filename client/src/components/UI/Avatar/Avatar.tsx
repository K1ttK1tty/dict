import { FC, memo } from 'react';
// icons
import defaultAvatar from '../../../pages/Icons/defaultAvatar.svg';
// redux
import { useAppSelector } from '../../../hooks/redux';
interface IAvatarProps {
    styles: string;
}
const Avatar: FC<IAvatarProps> = memo(function ({ styles }) {
    const { avatar } = useAppSelector(state => state.AuthSlice);
    const source = avatar ? avatar : defaultAvatar;
    return (
        <img className={styles} src={source} alt="Аватар" />
    );
});
export default Avatar;