import { extname } from "path";
import { v4 as uuidv4 } from 'uuid';

export let imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export let editFileName = (req, file, callback) => {
  let name = file.originalname.split('.')[0];
  let fileExtName = extname(file.originalname);
  let randomName = uuidv4();
  callback(null, `${name}-${randomName}${fileExtName}`);
};