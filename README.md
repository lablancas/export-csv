# Summary
This package provides a Meteor server method called `exportcsv-export` which will format a data set into a CSV string
and store the string as a Collection FS File using Grid FS Store.and

The package uses [Papa Parse](http://papaparse.com/docs#json-to-csv) to parse JSON to CSV

You can call `exportcsv-export` from your client code like such

`Meteor.call('exportcsv-export', data, function(err, exported){ ... });`

`data` must be 1 of 3 types
* An array of arrays
* An array of objects
* An object explicitly defining fields and data

The package also has a public Mongo Collection called `ExportCSV.Exports` which you can use to find and download 
Collection FS files.

## Example Client Calling Export Method

This snippet of a Meteor Template event shows calling the Meteor method `exportcsv-export` with by calling fetch() on a
Mongo.Collection cursor. If the return of 'export' is successful, a serialized FS.File object will be returned.

Note: If you want an FS.File object, you can retrieve it by calling `ExportCSV.Exports.find` (see next example).

```
Template.exportInvitesList.events({
    'click .export-invites': function(events, template){
        Session.set(template.data.name + "-exported", undefined);
        
        Meteor.call("exportcsv-export", template.data.invites.fetch(), function(err, exported){
            
            if(err)
                console.log(err);
            else
                Session.set(template.data.name + "-exported", exported);
                
    });
}});
```
    
## Example of Client Retrieving Exported File

This snippet of a Meteor Template helper retrieves an FS.File object from `ExportCSV.Exports` collection using the ID stored
in the Session variable that was saved after calling `exportcsv-export` (see previous example). 

Note: Calling 'export' method will return a plain JSON object instead of an FS.File object which has methods added by 
Collection FS such as url() which you can use to download the file.

```
Template.exportInvitesList.helpers({
    exportReady: function(){
        
        var exported = Session.get(this.name + "-exported");
        
        return exported ? ExportCSV.Exports.findOne(exported._id) : undefined;
}});
```
    
In case needed, here is the template that works with the above to examples

```
<template name="exportInvitesList">
    <a class="btn-flat waves-effect waves-deep-orange export-invites">
        <i class="material-icons">refresh</i>
    </a>
    
    
    {{#with exportReady}}
    <a href="{{this.url}}" target="_blank" class="exported-invites">Download Export</a>
    {{else}}
    <span class="grey-text">Export Not Ready</span>
    {{/with}}
</template>
```