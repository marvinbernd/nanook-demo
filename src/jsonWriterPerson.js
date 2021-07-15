const fs = require("fs");
const util = require("util");
const path = require("path");
const InterfaceWriter = require("@xhubio/nanook-table").InterfaceWriter;
const writeFile = util.promisify(fs.writeFile);

class JsonWriterPerson extends InterfaceWriter {
  /**
   * Writes the data
   */
  async write(testcaseData) {
    const fileName = await this.createFileName(testcaseData);
    const sheetName = testcaseData.tableName;

    for (const insId of Object.keys(testcaseData.data[sheetName])) {
      const data = testcaseData.data[sheetName][insId];

      return writeFile(fileName, JSON.stringify(data, null, 2));
    }
  }

  /**
   * Creates the file name to write the testcaseData object
   * @param testcaseData {object} The testcaseData object
   * @return fileName {string} The file name to write the object
   */
  async createFileName(testcaseData) {
    const tcName = testcaseData.name;
    const targetDir = path.join("tdg", tcName);

    return path.join(targetDir, "person.json");
  }
}

module.exports.JsonWriterPerson = JsonWriterPerson;
