var gulp 		= require('gulp');
var codeception = require('gulp-codeception');
var notify 		= require('gulp-notify');
var run 		= require('gulp-run');
var _        	= require('lodash');

gulp.task('codeception', function() {

	//Change this line to put where your code will be
	gulp.src('tests/**/*.php')
	  .pipe(run('clear')) 
	  .pipe(codeception('', {notify: true}))
	  .on('error', notify.onError(testNotification('fail', 'codeception')))
	  .pipe(notify(testNotification('pass', 'codeception')));
});

gulp.task('coding-testing',function(){

	//Files that must be watched to call the test 
	gulp.watch(['tests/**/*.php'], ['codeception']);
});

function testNotification(status, pluginName, override) {
    var options = {
        title:   ( status == 'pass' ) ? 'Tests Passed' : 'Tests Failed',
        message: ( status == 'pass' ) ? '\n\nAll tests have passed!\n\n' : '\n\nOne or more tests failed...\n\n',
        icon:    __dirname + '/node_modules/gulp-' + pluginName +'/assets/test-' + status + '.png'
    };
    options = _.merge(options, override);
  return options;
}