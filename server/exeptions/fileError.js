module.exports = class FileError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static ReadError() {
        return new FileError(500, "Ошибка при обновления данных")
    }

    static getDataError() {
        return new FileError(500, 'Ошибка при получении даных')
    }

}