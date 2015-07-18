// Write your package code here!

Exports = new FS.Collection("exports", {
  stores: [new FS.Store.GridFS("exports")]
});

if(Meteor.isServer){
    var fs = Npm.require('fs');
    
    Meteor.publish(null, function(){
        return Exports.find();
    });
    
    Exports.allow({
        insert: function(){
            return true;
        },
        download: function() {
            return true;
        }
    });
    
    Exports.deny({
        update: function(){
            return true;
        },
        remove: function() {
            return true;
        }
    });

    Meteor.methods({
        "export": function(data){

            var csv;

            csv = Baby.unparse(data);

            var updatedAt = new Date();
            var basename = "" + updatedAt.getFullYear() + updatedAt.getMonth() + updatedAt.getDate() + 
                "T" + updatedAt.getHours() + updatedAt.getMinutes() + updatedAt.getSeconds() +
                updatedAt.getMilliseconds() + "_" + Random.id(4) + ".csv";

            var fullname = "/tmp/" + basename;

            fs.writeFileSync(fullname, csv);

            Exports.insert(fullname);
            
            return Exports.findOne({'original.name': basename});
        }
    });
}