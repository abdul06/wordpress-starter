/* esline-disable */
// -----------------------------------------------
// Error Reporting
// @Desc: Custom Error Handling
// -----------------------------------------------
const notify = require('gulp-notify');

module.exports = (error) => {

  const lineNumber = (error.lineNumber) ? `LINE ${error.lineNumber} -- ` : '';

  notify({
    title: `Task Failed [${error.plugin}]`,
    message: `${lineNumber}See console.`,
  }).write(error);

  // Pretty error reporting
  const report = [
    `TASK: [${error.plugin}]`,
    `PROB: ${error.message}`,
  ];

  if (error.lineNumber) report.push(`LINE: ${error.lineNumber}`);
  if (error.fileName) report.push(`FILE: ${error.fileName}`);

  console.error(report.join('\n'));

  // Prevent the 'watch' task from stopping
  return this.emit('end');
};
