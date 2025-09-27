import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

import { isErrorWithProperty } from '@/shared/lib';

export const errorToast = (message: string, error?: unknown) => {
  toast(message, { theme: 'colored', type: 'error' });

  if (error) {
    console.error(`${message}\n`, error);
  }
};

export const successToast = (message: string) => {
  toast(message, { theme: 'colored', type: 'success' });
};

export function isErrorWithDetailArray(error: unknown): error is { errors: { detail: string }[] } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as any).errors) &&
    (error as any).errors.length > 0 &&
    typeof (error as any).errors[0].detail === 'string'
  );
}

export function trimToMaxLength(str: string, maxLength = 100): string {
  return str.length > maxLength ? `${str.slice(0, maxLength - 3)}...` : str;
}

export const handleErrors = (error: FetchBaseQueryError) => {
  if (error) {
    switch (error.status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
      case 'TIMEOUT_ERROR':
        errorToast(error.error);
        break;

      case 400:
        if (isErrorWithDetailArray(error.data)) {
          const errorMessage = error.data.errors[0].detail;

          if (errorMessage.includes('refreshToken')) return;
          errorToast(trimToMaxLength(errorMessage));
        } else {
          errorToast(JSON.stringify(error.data));
        }
        break;
      case 403:
        if (isErrorWithDetailArray(error.data)) {
          errorToast(trimToMaxLength(error.data.errors[0].detail));
        } else {
          errorToast(JSON.stringify(error.data));
        }
        break;

      case 404:
        if (isErrorWithProperty(error.data, 'error')) {
          errorToast(error.data.error);
        } else {
          errorToast(JSON.stringify(error.data));
        }
        break;

      case 401:
      case 429:
        if (isErrorWithProperty(error.data, 'message')) {
          errorToast(error.data.message);
        } else {
          errorToast(JSON.stringify(error.data));
        }
        break;

      default:
        if (error.status >= 500 && error.status < 600) {
          errorToast('Server error occurred. Please try again later.', error);
        } else {
          errorToast('Some error occurred');
        }
    }
  }
};
