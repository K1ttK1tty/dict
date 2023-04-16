module.exports = class FileError extends Error {

    static ReadError() {
        return new FileError(500, "Ошибка при обновления данных")
    }

    static getDataError() {
        return new FileError(500, 'Ошибка при получении даных')
    }

}