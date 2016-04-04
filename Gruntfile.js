module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'app.js', 'settings.js', 'build/**/*.js', '!build/js/lib/*.js'],
            options: {
                jshintrc: true
            }
        },
        less: {
            im: {
                files: {
                    'build/css/main.css': 'build/css/main.less'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['<%= jshint.files %>', '.jshintrc'],
                tasks: ['jshint']
            },
            less: {
                files: 'build/**/*.less',
                tasks: ['less']
            },
            static: {
                files: ['build/**/*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'less', 'watch']);
};

//