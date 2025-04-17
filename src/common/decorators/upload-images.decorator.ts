import {
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  UploadedFile,
} from '@nestjs/common';

export const UploadFile = () => {
  return UploadedFiles(
    new ParseFilePipe({
      fileIsRequired: false,
      validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
    }),
  );
};

export const UploadFiles = () => {
  return UploadedFile(
    new ParseFilePipe({
      fileIsRequired: false,
      validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
    }),
  );
};
