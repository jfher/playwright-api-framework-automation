const fs = require('node:fs');

for (const directory of ['allure-results', 'allure-report']) {
    fs.rmSync(directory, {
        recursive: true,
        force: true,
    });
}