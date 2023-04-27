import React from 'react';
// icons
import defaultAvatar from '../../../pages/Icons/defaultAvatar.svg'
// redux
import { useSelector } from 'react-redux';
const Avatar = function ({ styles }) {
    const { avatar } = useSelector(state => state.AuthSlice)
    const source = avatar ? avatar : defaultAvatar

    return (
        <img className={styles} src={source} alt="Аватар" />
    )
};
export default Avatar;