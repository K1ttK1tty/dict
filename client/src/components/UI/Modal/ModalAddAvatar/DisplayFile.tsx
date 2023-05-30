import { FC, memo } from 'react';
// types
interface IDisplayFile {
    styles: CSSModuleClasses;
    files: FileList | [];
    setFiles: (state: FileList | []) => void;
}
const DisplayFile: FC<IDisplayFile> = memo(function ({ files, setFiles, styles }) {
    return (
        <div className={styles.changeFileWrapper}>
            <span className={styles.fileName}>{files[0]?.name}</span>
            <button onClick={() => setFiles([])} className={styles.removeFile}>&times;</button>
        </div>
    );
});
export default DisplayFile;