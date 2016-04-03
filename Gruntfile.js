module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'app.js', 'settings.js', 'src/**/*.js', '!src/js/lib/*.js', 'app/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        less: {
            im: {
                files: {
                    'build/css/all.css': 'src/css/base.less'
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
                files: 'src/**/*.less',
                tasks: ['less']
            },
            static: {
                files: ['src/**/*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'less', 'watch']);
};

//