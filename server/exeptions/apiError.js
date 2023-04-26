module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }  

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static EmailNotFound(){
        return new ApiError(400, 'Такого почтового адреса не существует')
    }

    static UserNotFound(){
        return new ApiError(400, 'Не удалось найти пользователя')
    }
}
