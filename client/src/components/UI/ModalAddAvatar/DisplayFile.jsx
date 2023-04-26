import React, { memo } from 'react';
const DisplayFile = memo(function ({ files, setFiles, styles }) {
    return (
        <div className={styles.changeFileWrapper}>
            <span className={styles.fileName}>{files[0]?.name}</span>
            <button onClick={() => setFiles([])} className={styles.removeFile}>&times;</button>
        </div>
    )
});
export default DisplayFile;