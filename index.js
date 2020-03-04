#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const CURRENT_DIR = process.cwd();

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
	{
		name: 'project-choice',
		type: 'list',
		message: 'What project template would you like to generate?',
		choices: CHOICES
	},
	{
		name: 'project-name',
		type: 'input',
		message: 'Project name:',
		validate: function(input) {
			if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
			else
				return 'Project name may only include letters, numbers, underscores and hashes.';
		}
	}
];

inquirer.prompt(QUESTIONS).then((answers) => {
	const projectChoice = answers['project-choice'];
	const projectName = answers['project-name'];
	const templatePath = `${__dirname}/templates/${projectChoice}`;

	fs.mkdirSync(`${CURRENT_DIR}/${projectName}`);

	createDirectoryContents(templatePath, projectName);
});

function createDirectoryContents(templatePath, projectName) {
	const filesToCreate = fs.readdirSync(templatePath);

	//Iterate over each file from directory
	filesToCreate.forEach((file) => {
		const origFilePath = `${templatePath}/${file}`;

		const stats = fs.statSync(origFilePath);

		if (stats.isFile()) {
			const contents = fs.readFileSync(origFilePath, 'utf-8');
			const writePath = `${CURRENT_DIR}/${projectName}/${file}`;
			fs.writeFileSync(writePath, contents, 'utf-8');
		} else if (stats.isDirectory()) {
			fs.mkdirSync(`${CURRENT_DIR}/${projectName}/${file}`);

			createDirectoryContents(
				`${templatePath}/${file}`,
				`${projectName}/${file}`
			);
		}
	});
}
