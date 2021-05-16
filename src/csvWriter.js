const fs = require("fs");
const util = require("util");
const path = require("path");
const InterfaceWriter = require("@xhubio/nanook-table").InterfaceWriter;
const { __esModule } = require("@xhubiotable/processor/lib/Processor");
const fetch = require("node-fetch");

const writeFile = util.promisify(fs.writeFile);
const DELIMITER = ",";

class CsvWriter extends InterfaceWriter {
  async write(testcaseData) {
    const fileName = await this.createFileName(testcaseData);

    const sheetName = testcaseData.tableName;
    const res = [];

    for (const insId of Object.keys(testcaseData.data[sheetName])) {
      const dat = testcaseData.data[sheetName][insId];

      const row = [
        dat.firstName,
        dat.lastName,
        dat.email,
        dat.password,
        dat.confirmPassword,
      ];

      await this.fetchRegisterAPI(dat)
        .then((response) => response.json())
        .then((data) => {
          row.push(data.message);
        });

      res.push(row.join(DELIMITER));
    }

    return writeFile(fileName, res.join("\n"));
  }

  fetchRegisterAPI(data) {
    const response = fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  }

  async createFileName(testcaseData) {
    const tcName = testcaseData.name;
    const targetDir = path.join("tdg", tcName);
    return path.join(targetDir, "person.csv");
  }
}

module.exports.CsvWriter = CsvWriter;
