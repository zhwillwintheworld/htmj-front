// 自定义错误类
export class HttpError extends Error {
    constructor(public message: string) {
        super(message);
        this.name = 'HttpError';
    }
}

export class ApiError extends Error {
    constructor(public code: number, public message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

