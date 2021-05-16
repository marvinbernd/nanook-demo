const DataGeneratorBase = require("@xhubio/nanook-table").DataGeneratorBase;

class GeneratorPerson extends DataGeneratorBase {
  async _doGenerate(instanceId, testcase, todoGenerator) {
    const firstName =
      FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const domain = FREE_MAILER[Math.floor(Math.random() * FREE_MAILER.length)];
    const email = this.makeUnique(firstName, lastName, domain);

    return {
      email,
      firstName,
      lastName,
    };
  }

  makeUnique(firstName, lastName, domain) {
    let email = `${firstName}.${lastName}@${domain}`;
    let counter = 1;
    while (this.uniqueSet.has(email)) {
      email = `${firstName}.${lastName}-${counter}@${domain}`;
      counter++;
    }
    return email;
  }

  async generate(instanceId, testcase, todoGenerator) {
    // Get parameter from Excel sheet
    // e.g. firstName
    const param = todoGenerator.config;

    // if the same instanceId, return same data
    if (instanceId && this.instanceData.has(instanceId)) {
      const valObj = this.instanceData.get(instanceId);
      return valObj[param];
    }

    // if no data for instanceid, create a new one
    const genData = await this._doGenerate(instanceId, testcase, todoGenerator);
    // store the new generated data under the current instance id
    if (genData !== undefined && instanceId) {
      this.instanceData.set(instanceId, genData);
    }

    return genData[param];
  }
}

module.exports.GeneratorPerson = GeneratorPerson;

const FIRST_NAMES = [
  "Aaron",
  "Hugo",
  "Hussein",
  "Ian",
  "Said",
  "Salih",
  "Anabel",
  "Anastasia",
  "Andrea",
  "Angela",
  "Celine",
  "Ceyda",
  "Ceylin",
  "Cosima",
];
const LAST_NAMES = [
  "Kramer",
  "Krauel",
  "Kraus",
  "Krause",
  "Liebold",
  "Lufft",
  "Lukoschek",
  "Lutje",
  "Mai",
  "Meloni",
  "Melzer",
  "Morhelfer",
];

const FREE_MAILER = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "gum.org",
  "foo.bar",
];
