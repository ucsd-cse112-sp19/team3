const fs = require('fs');

const coverageFileName = 'coverage/lcov.info';
const testCoverageFileName = 'coverage_test/lcov.info';
const tmpOutputFileName = 'coverage/lcov.info.new';

const baseText = fs.readFileSync(coverageFileName, 'utf8');
const testText = fs.readFileSync(testCoverageFileName, 'utf8');

const baseLines = baseText.split('\n');
const testLines = testText.split('\n');

const splitCoverages = function(lines) {
  let coverage = [];
  const coverages = [];
  for (const line of lines) {
    if (line === 'end_of_record') {
      coverage.push(line);
      coverages.push(coverage);
      coverage = [];
    } else {
      coverage.push(line);
    }
  }
  return coverages;
};

const getLineNumber = function(line) {
  const parts = line.split(':');
  return parseInt(parts[1].split(',')[0]);
};

const isMissLine = function(line) {
  const parts = line.split(':');
  return parseInt(parts[1].split(',')[1]) == '0';
};

const mergeCoverage = function(baseCoverage, testCoverage) {
  const coverage = [];
  for (let i = 0; i < baseCoverage.length; i++) {
    if (baseCoverage[i].substring(0, 2) === 'DA') {
      const lineNum = getLineNumber(baseCoverage[i]);
      let testLineNum;
      let j;
      for (j = 0; j < testCoverage.length; j++) {
        testLineNum = getLineNumber(testCoverage[j]);
        if (testLineNum == lineNum) break;
      }
      if (lineNum == testLineNum && isMissLine(baseCoverage[i])) {
        coverage.push(testCoverage[j]);
        continue;
      }
    }
    coverage.push(baseCoverage[i]);
  }
  return coverage;
};

const mergeCoverages = function(baseCoverages, testCoverages) {
  const coverages = [];
  // Update DA (line coverage)
  for (let i = 0; i < baseCoverages.length; i++) {
    coverages.push( mergeCoverage(baseCoverages[i], testCoverages[i]) );
  }
  return coverages;
};

const updateCoveragesCounts = function(coverages) {
  const updatedCoverages = [];
  for (const coverage of coverages) {
    const updatedCoverage = [];
    let missCount = 0;
    let lineFound = 0;
    for (const line of coverage) {
      if (line.substring(0, 2) === 'DA' && isMissLine(line)) {
        missCount += 1;
      } else if (line.substring(0, 2) === 'LF') {
        lineFound = parseInt(line.split(':')[1]);
      } else if (line.substring(0, 2) === 'LH') {
        const newHit = lineFound - missCount;
        updatedCoverage.push('LH:' + String(newHit));
        continue;
      }
      updatedCoverage.push(line);
    }
    updatedCoverages.push(updatedCoverage);
  }
  return updatedCoverages;
};

const parseCoverage = function(baseLines, testLines) {
  // Split coverages
  const baseCoverages = splitCoverages(baseLines);
  const testCoverages = splitCoverages(testLines);
  // Merge coverages
  const mergedCoverages = mergeCoverages(baseCoverages, testCoverages);
  const updatedCoverages = updateCoveragesCounts(mergedCoverages);
  let mergedStr = '';
  for (const coverage of updatedCoverages) {
    for (const line of coverage) {
      mergedStr += line + '\n';
    }
  }
  fs.writeFileSync(tmpOutputFileName, mergedStr);
};

const cleanUp = function() {
  fs.rename(tmpOutputFileName, coverageFileName, function() {});
  fs.unlinkSync(testCoverageFileName);
};

parseCoverage(baseLines, testLines);
cleanUp();
