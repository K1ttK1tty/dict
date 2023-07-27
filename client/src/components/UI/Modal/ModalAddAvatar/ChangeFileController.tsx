import { FC, memo } from 'react';
// components
import DisplayFile from './DisplayFile';
// types
import { IChangeFileController } from '../ModalsModels';
const ChangeFileController: FC<IChangeFileController> = memo(function (
    {
        styles,
        upload,
        files,
        changeFile,
        setFiles
    }
) {
    return (
        <div className={styles.wrapper}>
            {files[0]?.name ?
                <input
                    className={styles.inputUpload}
                    onClick={upload}
                    type="submit"
                    value="Загрузить"
                />
                : <label className={styles.label}> Выбрать файл
                    <input
                        className={styles.input}
                        onChange={e => changeFile(e.target)}
                        accept="image/png, image/jpeg"
                        type="file"
                    />
                </label>
            }
            {files[0]?.name &&
                <DisplayFile
                    files={files}
                    styles={styles}
                    setFiles={setFiles}
                />
            }
        </div>
    );
});
export default ChangeFileController;