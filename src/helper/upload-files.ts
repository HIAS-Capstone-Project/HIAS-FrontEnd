import { storage } from 'config/firebase-config';
import { ref, uploadBytes } from 'firebase/storage';
import _ from 'lodash';
import { v4 } from 'uuid';

export const uploadFiles = async (fileList: any[]) => {
  if (_.isEmpty(fileList)) return;
  const res = await Promise.all(
    fileList.map(async file => {
      try {
        const fileRef = ref(storage, `files/${v4() + file.name}`);
        uploadBytes(fileRef, file.originFileObj).then(res => res);
      } catch (error) {
        return error;
      }
    }),
  );
  return res;
};

export const removeTokenOnURL = (url: string) => {
  const index = url.indexOf('&token=');
  if (index === -1) return url;
  return url.slice(0, index);
};
export default {};
