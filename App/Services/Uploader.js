import Config from 'react-native-config';
import { startUpload, addListener } from 'react-native-background-upload';
import API from './Api';

let ROOT = `${Config.baseUrl}/wb/app_wishbox/upload`;
if (__DEV__ && false) {
  // ROOT = `${Config.devBaseUrl}/wb/app_wishbox/upload`;
  // ROOT = 'http://localhost:3000/wb/app_wishbox/upload';
  ROOT = 'http://192.168.1.57:3000/wb/app_wishbox/upload';
}
// our "constructor"
const create = (baseURL = ROOT) => {
  const api = API.create();

  const options = {
    url: baseURL,
    method: 'POST',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'x-www-form-urlencoded',
      secret: Config.secret
    },
    notification: {
      enabled: true
    }
  };

  const upload = (path, data, index, onProgress, onError, onComplete) => {
    if (path.startsWith('http') && data === undefined) {
      if (onComplete) {
        api
          .saveWebImages(path)
          .then(response => response.data)
          .then(info => onComplete(info, index));
      }
      return;
    }

    startUpload({ ...options, path })
      .then(uploadId => {
        onProgress && addListener('progress', uploadId, info => onProgress(info, index));
        onError && addListener('error', uploadId, info => onError(info, index));
        onComplete && addListener('completed', uploadId, info => onComplete(info, index));
      })
      .catch(err => {
        __DEV__ && console.log('Upload error!', index, err);
      });
  };

  return {
    upload
  };
};

export default { create };
