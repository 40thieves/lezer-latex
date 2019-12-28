const { parser } = require("../dist/latex");
const { fileTests } = require("lezer-generator/dist/test");

const fs = require("fs");
const path = require("path");

const caseDir = __dirname;

for (let file of fs.readdirSync(caseDir)) {
  if (!/\.txt$/.test(file)) continue;
  let name = /^[^\.]*/.exec(file)[0];

  describe(name, () => {
    const tests = fileTests(
      fs.readFileSync(path.join(caseDir, file), "utf8"),
      file
    );
    for (let { name, run } of tests) {
      it(name, () => run(parser));
    }
  });
}
