import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dsnapjlnx',
      api_key: '739574921273656',
      api_secret: '6kutydxSsjPCXTrzEOzMl-e45q4',
    });
  },
};
