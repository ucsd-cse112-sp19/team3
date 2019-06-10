const fs = require('fs');
const readline = require('readline');

const components = [
  'CoreHello',
  'CustomButton',
  'CustomPopover',
  'CustomSlider',
];

const isMatchLine = function(line) {
  for (const comp of components) {
    if (line.includes(comp)) {
      return comp;
    }
  }
  return null;
};

const coverageFileName = 'coverage/lcov.info';
const fileStream = fs.createReadStream(coverageFileName);

const lineReader = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let coverage = '';

lineReader.on('line', function(line) {
  const matchComp = isMatchLine(line);
  if (!matchComp) {
    coverage += line + '\n';
  } else {
    let newLine = '';
    const parts = line.split('.nyc_output/js/');
    newLine += parts[0];
    newLine += 'Components/';
    newLine += matchComp + '/';
    newLine += parts[1];
    coverage += newLine + '\n';
  }
});

lineReader.on('close', function() {
  fs.writeFileSync(coverageFileName, coverage);
});
