import React, { useRef, memo } from 'react';
const AddAvatarContent = memo(function ({ changeFile, upload}) {
    const element = useRef()

    const setFocus = () => {
        setTimeout(() => {
            element.current.focus()
        }, 150);
    }

    return (
        <div tabIndex={'1'} onClick={setFocus()} ref={element}>
            <label>
                <input onChange={e => changeFile(e.target)} accept="image/png, image/jpeg" type="file" />
            </label>
            <input onClick={upload} type="submit" />
        </div>
    )
});
export default AddAvatarContent;