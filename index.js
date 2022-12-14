
const inquirer = require('inquirer');
const fs = require('fs');

const generateMarkdown = ({title, description, username , name, year, email, license, path, installation, usage, credits, contribution, tests}) =>
     
`# ${title}
## Description
${description}
 
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
## Installation
${installation}
## Usage
${usage}
## License
${license} ${createBadge(license)}
Copyright (c) ${year} ${name}
## Credits 
${credits}
## Contributing
${contribution}
## Tests
${tests}
## Questions
For any questions pertaining to this project, the developer can be reached via any of the contact methods listed below. 
Please ensure that you include the name of this project ("${title}") in any communications. 
- Email me: ${email}
- [My Github Profile](github.com/${username})
## Screenshot of Deployed Application
![Screenshot of Application](${path})`
;

function createBadge(badgeName) {
    let badge;
    if (badgeName === 'MIT License') {
        badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    } else if (badgeName === 'GNU GPLv3') {
        badge = `[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
    } else {
        badge = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`
    }
    return badge
}

const licenses = [
    'MIT License',
    'GNU GPLv3',
    'Mozilla Public License 2.0',
];


inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the title of your project.',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter a description for your project.',
        },
        {
            type: 'input',
            name: 'username',
            message: 'Please enter your Github username',
        },
        {
            type: 'input',
            name: 'name',
            message: 'Please enter your full name',
        },
        {
            type: 'input',
            name: 'year',
            message: 'Please enter the current year (yyyy format)',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your email address',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please select a license from the list',
            choices: licenses,
        },
        {
            type: 'input',
            name: 'path',
            message: 'Please enter the file path of a screenshot of your deployed application, relative to the project root folder. Include the file name and file extension! Default is ./assets/images/screenshot.png',
            default: './assets/images/screenshot.png',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please enter any installation instructions required to use your project',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please enter any usage instructions for your project',
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Please enter any credits or acknowledgements for your project',
        },
        {
            type: 'input',
            name: 'contirbution',
            message: 'Please enter instructions on how to contribute to your project',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Please enter instructions on how to run tests for your project',
        },
    ])
    .then((data) => {
        const readmeContent = generateMarkdown(data);

        fs.writeFile('readme.md', readmeContent, (err) =>
        err ? console.log(err) : console.log('Success!!!')
        )
    });