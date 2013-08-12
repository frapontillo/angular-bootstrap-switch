// Generated on 2013-07-30 using generator-angular 0.3.1
'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    src: 'src',
    dist: 'dist',
    example: 'example'
  };

  try {
    yeomanConfig.src = require('./bower.json').appPath || yeomanConfig.src;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('bower.json'),
    meta: {
      banner: '/**\n' + ' * <%= pkg.name %>\n' +
		' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
		' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
		' * @link <%= pkg.homepage %>\n' +
        ' * @license <%= _.pluck(pkg.licenses, "type").join(", ") %>\n**/\n\n'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.src %>/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      travis: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      }
    },
    ngmin: {
      dist: {
        src: ['src/**/*.js'],
        dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      // Prepends everything with a banner
      dist: {
        src: '<%= ngmin.dist.dest %>',
        dest: '<%= ngmin.dist.dest %>'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      min: {
        files: {
          '<%= yeoman.dist %>/<%= pkg.name %>.min.js': '<%= ngmin.dist.dest %>'
        }
      }
    }
  });

  // Tests the directive
  grunt.registerTask('test', ['jshint', 'karma']);
  grunt.registerTask('test-travis', ['jshint', 'karma:travis']);

  // Build the directive
  //  - clean:dist: cleans the output directory
  //  - ngmin: prepares the angular files into a single one
  //  - concat: adds a banner to the debug file
  //  - uglify: adds a banner to the minified file
  grunt.registerTask('build', ['clean:dist', 'ngmin', 'concat', 'uglify']);

  // Default task, do everything
  grunt.registerTask('default', ['test-travis', 'build']);
};
