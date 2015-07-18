// Write your package code here!
ExportCSV = {
    Exports : new FS.Collection("exportcsv-exports", {
        stores: [new FS.Store.GridFS("exportcsv-exports")]
    })
};

if(Meteor.isServer){
    var fs = Npm.require('fs');
    
    Meteor.publish(null, function(){
        return ExportCSV.Exports.find();
    });
    
    ExportCSV.Exports.allow({
        insert: function(){
            return true;
        },
        download: function() {
            return true;
        }
    });
    
    ExportCSV.Exports.deny({
        update: function(){
            return true;
        },
        remove: function() {
            return true;
        }
    });

    Meteor.methods({
        "exportcsv-export": function(data){

            var csv;

            csv = Baby.unparse(data);

            var updatedAt = new Date();
            var basename = "" + updatedAt.getFullYear() + updatedAt.getMonth() + updatedAt.getDate() + 
                "T" + updatedAt.getHours() + updatedAt.getMinutes() + updatedAt.getSeconds() +
                updatedAt.getMilliseconds() + "_" + Random.id(4) + ".csv";

            var fullname = "/tmp/" + basename;

            fs.writeFileSync(fullname, csv);

            ExportCSV.Exports.insert(fullname);
            
            return ExportCSV.Exports.findOne({'original.name': basename});
        }
    });
}