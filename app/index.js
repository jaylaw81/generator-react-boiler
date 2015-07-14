'use strict';
var chalk = require('chalk'),
	yeoman = require('yeoman-generator');
var _ = require('underscore');
var slugify = require("underscore.string/slugify");

var ReactSDPGenerator = yeoman.generators.Base.extend({

	initializing: function() {
		this.pkg = require('../package.json');
	},

	prompting: function() {
		var done = this.async();

		this.log(
			'\n' + chalk.bold.underline('Welcome to the React SDP Component Generator')
		);

		var prompts = [
		{
			type: 'input',
			name: 'projectName',
			message: 'What is the name of the project?',
			store: true,
			default: 'MyApp'
		},
		{
			type: 'input',
			name: 'componentName',
			message: 'What is the name of the component?',
			store: true,
			default: 'NewComponent',
			createDirectory: true
		},
		{
			type: 'input',
			name: 'componentVersion',
			message: 'What version is this component',
			store: true,
			default: '0.0.1'
		}
		];

		this.prompt(prompts, function (props) {
			this.log('\n');
			_.extend(this, props);
			this.componentKey = slugify(this.componentName).toLowerCase();
			if (props.createDirectory) {
				this.destinationRoot(this.componentKey);
			}
			done();
		}.bind(this));
	},

	writing: {
		clientfiles: function() {
			this.template('client/base/_package.json', 'package.json');
			this.template('client/base/_config.rb', 'config.rb');
			this.template('client/base/index.html', 'index.html');
			this.template('client/base/css/_style.scss', this.componentKey + '/lib/css/style.scss');
			this.template('client/base/__tests__/_test.js', this.componentKey + '/lib/views/__test__/'+this.componentKey+'-test.js');
			this.template('client/base/actions/_actions.js', this.componentKey + '/lib/actions/actions.js');
			this.template('client/base/router/_routes.jsx', this.componentKey + '/lib/router/routes.jsx');
			this.template('client/base/stores/_store.js', this.componentKey + '/lib/stores/store.js');
			this.template('client/base/views/_app.jsx', this.componentKey + '/lib/views/app.jsx');
			this.template('client/_main.js', this.componentKey + '/lib/main.js');
			this.template('client/_alt-application.js', this.componentKey + '/lib/alt-application.js');
		}
	},

	install: function () {
		this.npmInstall();
	},

	end: function() {

		var chdir = this.createDirectory ? '"cd ' + this.componentKey + '" then ' : '';
		this.log(
			'\n' + chalk.green.underline('Your new React Component is ready!')
		);
	}

});

module.exports = ReactSDPGenerator;
