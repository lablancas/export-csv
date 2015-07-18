Package.describe({
  name: 'lablancas:export-csv',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('export-csv.js');
    
    api.use('harrison:babyparse');
    api.use('cfs:standard-packages');
    api.use('cfs:gridfs');
    
    api.export('Exports');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lablancas:export-csv');
  api.addFiles('export-csv-tests.js');
});
