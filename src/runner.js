const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const tdgdir = path.join(__dirname, "../tdg");

const testcases = fs.readdirSync(tdgdir);

testcases.forEach(async (testcase) => {
  const personPath = path.join(tdgdir, testcase, "person.json");

  if (fs.existsSync(personPath)) {
    const PersonData = fs.readFileSync(personPath);
    const person = JSON.parse(PersonData);

    await fetchRegisterAPI(person)
      .then((response) => response.json())
      .then((data) => {
        console.log(testcase, data.message);
      });
  }
});

function fetchRegisterAPI(data) {
  const response = fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}
