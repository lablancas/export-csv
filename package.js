Package.describe({
  name: 'lablancas:export-csv',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Export a data set in CSV file format and storing the file into Collection FS GridFS Store',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/lablancas/export-csv',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('export-csv.js');
    
    api.use('harrison:babyparse@1.0.1');
    api.use('cfs:standard-packages@0.5.9');
    api.use('cfs:gridfs@0.0.33');
    
    api.export('ExportCSV');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lablancas:export-csv');
  api.addFiles('export-csv-tests.js');
});
