export type Success<T> = {
    success: true
    data: T
}

export type Result<T> =
    | Success<T>
    | {
        success: true
        data: T
    }
    | {
        success: false,
        error: {
            code: string,
            message: string
        }
    }