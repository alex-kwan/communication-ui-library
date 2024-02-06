// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* @conditional-compile-remove(file-sharing) */
import { ActiveFileUpload } from '../FileUploadCards';

/**
 * @private
 */
export const MAXIMUM_LENGTH_OF_MESSAGE = 8000;
const EMPTY_MESSAGE_REGEX = /^\s*$/;

/* @conditional-compile-remove(file-sharing) */
/**
 * @private
 */
export const hasIncompleteFileUploads = (activeFileUploads: ActiveFileUpload[] | undefined): boolean => {
  return !!(
    activeFileUploads?.length &&
    !activeFileUploads.filter((fileUpload) => !fileUpload.error).every((fileUpload) => fileUpload.uploadComplete)
  );
};

/* @conditional-compile-remove(file-sharing) */
/**
 * @private
 */
export const hasCompletedFileUploads = (activeFileUploads: ActiveFileUpload[] | undefined): boolean => {
  return !!activeFileUploads?.find((file) => !file.error);
};

/**
 * @private
 */
export const exceedsMaxAllowedLength = (valueLength: number): boolean => {
  return valueLength > MAXIMUM_LENGTH_OF_MESSAGE;
};

/**
 * @private
 */
export const sanitizeText = (message: string): string => {
  if (EMPTY_MESSAGE_REGEX.test(message)) {
    return '';
  } else {
    return message;
  }
};