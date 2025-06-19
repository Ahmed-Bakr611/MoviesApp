const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ImagesUtil {
  constructor(folderPath) {
    this.folderPath = folderPath;
  }
  saveImage(buffer, originalName) {
    const ext = path.extname(originalName);
    const uniqueName = `${uuidv4()}${ext}`;
    const fullPath = this.getFullPath(uniqueName);
    fs.writeFileSync(fullPath, buffer);
    return uniqueName;
  }
  deleteImage(imageName) {
    const fullPath = this.getFullPath(imageName);
    if (!fs.existsSync(fullPath)) return false;

    fs.unlinkSync(fullPath);
    return true;
  }
  imageExists(imageName) {
    const fullPath = this.getFullPath(imageName);
    return fs.existsSync(fullPath);
  }
  getFullPath(imageName) {
    return path.join(this.folderPath, imageName);
  }
}

module.exports = ImagesUtil;
