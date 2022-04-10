import { HttpCode } from "models/enums/Http-Code";
import { toast } from "react-toastify";

interface ApiOptions<T> {
    url: string;
    body?: any;
    options?: any | null;
    ignoreWarnings?: boolean;
    rethrowUnknownError?: boolean;
    errorMessage?: string;
    onSuccess?: (res: T) => void;
    onKnownFailure?: (error: any, fallback: (error: any) => void) => void;
}

class Api {
    headers() {
        return {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json'
        };
    }

    async post<T>({ url, body, options = null, rethrowUnknownError = true, errorMessage = "There was an issue saving changes.", onSuccess = undefined, onKnownFailure = undefined }: ApiOptions<T>): Promise<T> {
        let jsonBody = JSON.stringify(body);
        return this.callApi({ url, options: { method: "POST", body: jsonBody, ...options }, rethrowUnknownError, errorMessage, onSuccess, onKnownFailure });
    }

    async put<T>({ url, body, options = null, ignoreWarnings = false, rethrowUnknownError = true, errorMessage = "There was an issue saving changes.", onSuccess = undefined, onKnownFailure = undefined }: ApiOptions<T>): Promise<T> {
        let jsonBody = JSON.stringify(body);
        if (ignoreWarnings) {
            url += "?ignoreWarnings=true";
        }
        return this.callApi({ url, options: { method: "PUT", body: jsonBody, ...options }, rethrowUnknownError, errorMessage, onSuccess, onKnownFailure });
    }

    async delete<T>({ url, body = null, options = null, rethrowUnknownError = true, errorMessage = "There was an issue making these changes.", onSuccess = undefined, onKnownFailure = undefined }: ApiOptions<T>): Promise<T> {
        let jsonBody = JSON.stringify(body);
        return this.callApi({ url, options: { method: "DELETE", body: jsonBody, ...options }, rethrowUnknownError, errorMessage, onSuccess, onKnownFailure });
    }

    async callApi<T>({ url, options = null, rethrowUnknownError = false, errorMessage = "There was an issue retrieving data.", onSuccess = undefined, onKnownFailure = undefined }: ApiOptions<T>): Promise<T> {
        options = { method: "GET", headers: { ...this.headers() }, ...options };

        return fetch(url, options)
            .then(res => { return this.handleResponse(res, rethrowUnknownError, errorMessage, onSuccess, onKnownFailure); });
    }

    handleResponse<T>(res: any, rethrowUnknownError: boolean, defaultErrorMessage: string, onSuccess?: any, onKnownFailure?: any) {
        if (res.ok) {
            if (res.status === HttpCode.NO_CONTENT)
                return onSuccess ? onSuccess() : null;
            if (onSuccess)
                return res.json().then(onSuccess);
            return res.json();
        }
        return this.handleErrorResponse(res, rethrowUnknownError, defaultErrorMessage, onKnownFailure);
    }

    handleErrorResponse(res: any, rethrowUnknownError: boolean, defaultErrorMessage: string, onKnownFailure?: any) {
        this.handleAuthError(res);
        if (res.status >= 500 && res.status < 600)
            return this.handleInternalServerError(res, rethrowUnknownError, defaultErrorMessage);
        return res.json().then((error: any) => {
            if (onKnownFailure)
                return onKnownFailure(error, this.knownErrorFallback);
            this.knownErrorFallback(error);
        });
    }

    handleAuthError(res: any) {
        if (res.status === HttpCode.EXPECTATION_FAILED
            || res.status === HttpCode.UNAUTHORIZED) {
            window.location.href = "/signin";
        }
        if (res.status === HttpCode.FORBIDDEN
            && !this.isOnLockedPage())
            window.location.href = "/locked";
    }

    isOnLockedPage() {
        return window.location.href.indexOf('locked') != -1;
    }

    handleInternalServerError(res: any, rethrowUnknownError: boolean, defaultErrorMessage: string) {
        return res.text().then((error: string) => {
            let errorMessage = new Error(error)
            if (rethrowUnknownError)
                throw errorMessage;
            else {
                toast.error(defaultErrorMessage);
            }
        });
    }

    knownErrorFallback = (error: any) => {
        let errorText = this.getErrorText(error);
        if (errorText) {
            let errorMessage = new Error(errorText);
            toast.error(errorMessage.message);
        }
    }

    getErrorText(error: any): string {
        let errorText: string;
        if (error.Message)
            errorText = error.Message;
        else if (error.title)
            errorText = error.title;
        else if (typeof error === 'string')
            errorText = error;
        else
            errorText = "There was an unexpected issue processing your request.";
        return errorText;
    }
}

export default new Api();