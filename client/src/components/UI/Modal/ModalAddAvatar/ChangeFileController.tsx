import { FC, memo } from 'react';
// components
import DisplayFile from './DisplayFile';
// types
interface IChangeFileController {
    styles: CSSModuleClasses;
    changeFile: (file: HTMLInputElement) => void;
    files: FileList | [];
    upload: () => void;
    setFiles: (state: FileList | []) => void;
}
const ChangeFileController: FC<IChangeFileController> =
    memo(function ({ styles, upload, files, changeFile, setFiles }) {
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