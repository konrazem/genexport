const fs = require('fs');

/**
 * SIMPLE TOOL TO GENERATE index.ts FILE THAT EXPORTS ALL FILE NAMES
 * PASS FULL PATH TO THE DIRECTORY!!! I.E:
 * <PATH> - C:\iamu-frontend\packages\iamu-translator\src\static\pages
 */
// second argument should be the path to given file
const path = process.argv[2];

if (path) {
  if (path === '---help' || path === '-h') {
    console.log(`
      SIMPLE TOOL TO GENERATE index.ts FILE THAT EXPORTS ALL FILE NAMES
      PASS FULL PATH TO THE DIRECTORY!!! I.E:
      <PATH> - C:\iamu-frontend\packages\iamu-translator\src\static\pages
  `);

    return;
  }

  // LIST ALL DIRECTORIES FROM THIS FILE
  fs.readdir(path, (err, files) => {
    if (!files || files.length === 0) {
      console.log(
        '**ERROR**  There is no such path or there are no files there. ',
        { err, path },
      );
    }

    if (files.some((f) => f === 'index.ts')) {
      console.error('**ERROR**  There is index.ts there');
      return;
    }

    let imp = [];
    const exp =
      'export { ' + files.map((f) => f.split('.')[0]).join(', ') + ' };';

    if (files && files.length > 0) {
      files.forEach((file) => {
        // OMIT THIS FILE NAME
        const noExt = file.split('.')[0];
        imp.push(`import { ${noExt} } from './${noExt}';`);
      });
    }

    const content = imp.join('\n') + '\n\n' + exp;

    console.log('------- FILE CONTENT -----------');

    console.log(content);

    console.log('--------------------------------');

    fs.writeFile(path + '\\index.ts', content, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully

      console.log('**SUCCESS**  File written successfully');
    });
  });

  return;
}

console.log('**INFO**  Plese give path to file argument');
