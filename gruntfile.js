module.exports = function(grunt) {

  grunt.initConfig({
    coffee: {
      scripts: {
        expand: true,
        flatten: true,
        cwd: "public/coffeescripts/",
        src: ["*.coffee"],
        dest: "public/javascripts/",
        ext: ".js"
      }
    },

    concat: {
      js: {
        src: ['public/javascripts/*.js'],
        dest: 'public/dist/all.js'
      },
      css: {
        src: ['public/stylesheets/*.css'],
        dest: 'public/dist/all.css'
      }
    },

    uglify: {
      js: {
        files: {
          'public/dist/all.min.js':['public/dist/all.js']
        }
      }
    },

    less: {
      transform: {
        expand: true,
        cwd: "public/less/",
        src: ["*.less"],
        dest: "public/stylesheets/",
        ext: ".css"
      }

    },
    cssmin: {
      target: {
        files: {
          'public/dist/all.min.css': ['public/stylesheets/*.css']
        }
      }
    },

    watch: {
      coffees: {
        files: ['public/0coffeescripts/*.coffee'],
        tasks: ['process-coffee']
      },
      lesses: {
        files: ['public/0less/*.less'],
        tasks: ['process-less']
      }
    }

    // concurrent: {
    //   target1: ['cssmin', 'uglify', 'concat']
    // }
    
  });


  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-newer');

  //https://github.com/sindresorhus/grunt-concurrent
  grunt.registerTask('process-less', ['newer:less', 'concat:css', 'cssmin']);
  grunt.registerTask('process-coffee', ['newer:coffee','concat:js', 'uglify:js']);
  grunt.registerTask('default', ['coffee', 'less', 'concat', 'uglify', 'cssmin', 'watch']);
  
};