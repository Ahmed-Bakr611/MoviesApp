const fs = require('fs').promises;
class FilesUtil {
  constructor(filePath) {
    this.filePath = filePath;
  }
  async readFromFile() {
    const data = await fs.readFile(this.filePath);
    return JSON.parse(data.toString());
  }

  async writeToFile(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }


}


module.exports = FilesUtil;