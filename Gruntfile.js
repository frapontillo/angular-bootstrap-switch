'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    src: 'src',
    dist: 'dist',
    test: 'test',
    temp: '.temp'
  };

  try {
    yeomanConfig.src = require('./bower.json').appPath || yeomanConfig.src;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('bower.json'),
    meta: {
      banner:
        '/**\n' +
        ' * <%= pkg.name %>\n' +
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
		    ' * @link <%= pkg.homepage %>\n' +
        ' * @license <%= _.map(pkg.licenses, function(l) { return l.type + "(" + l.url + ")"; }).join(", ") %>\n' +
        '**/\n\n'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.src %>/**/*.js'
      ],
      test: {
        src: ['<%= yeoman.test %>/spec/**/*.js'],
        options: {
          jshintrc: '<%= yeoman.test %>/.jshintrc'
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        options: {
          singleRun: false
        }
      },
      final: {
        options: {
          singleRun: true
        }
      },
      travis: {
        browsers: ['PhantomJS'],
        options: {
          singleRun: true
        }
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
      },
      temp: {
        src: ['<%= yeoman.dist %>/<%= yeoman.temp %>']
      }
    },
    ngmin: {
      dist: {
        expand: true,
        cwd: '<%= yeoman.src %>',
        src: ['**/*.js'],
        dest: '<%= yeoman.dist %>/<%= yeoman.temp %>'
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
        process: function(src, filepath) {
          // don't strip 'use strict' in the prefix
          if (filepath === 'bsSwitch.prefix') {
            return src;
          }
          return '// Source: ' + filepath + '\n' +
            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        }
      },
      dist: {
        src: ['bsSwitch.prefix', 'common/*.js', '<%= yeoman.dist %>/<%= yeoman.temp %>/**/*.js', 'bsSwitch.suffix'],
        dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      min: {
        files: {
          '<%= yeoman.dist %>/<%= pkg.name %>.min.js': '<%= concat.dist.dest %>'
        }
      }
    }
  });

  // Test the directive
  grunt.registerTask('test', ['jshint', 'karma:unit']);
  grunt.registerTask('test-travis', ['jshint', 'karma:travis']);

  // Build the directive
  //  - clean, cleans the output directory
  //  - ngmin, prepares the angular files
  //  - concat, concatenates and adds a banner to the debug file
  //  - uglify, minifies and adds a banner to the minified file
  //  - clean:temp, cleans the ngmin-ified directory
  grunt.registerTask('build', ['clean', 'ngmin', 'concat', 'uglify', 'clean:temp']);

  // Default task, do everything
  grunt.registerTask('default', ['test-travis', 'build']);
};
