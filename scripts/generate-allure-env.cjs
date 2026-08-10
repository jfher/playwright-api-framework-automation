/* eslint-env node */

const fs = require('node:fs');

fs.writeFileSync(
    'allure-results/environment.properties',
    `
Environment=QA
API=Restful Booker
Browser=Chromium
Node=${process.version}
`,
);