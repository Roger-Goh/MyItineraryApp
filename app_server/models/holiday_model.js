var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema(
    {                                                                     //example data
        taskname: {type:String, required:true},                           //"Accommodation" 
        taskdesc: {type:String, required:true},                           //"@Masaru organise a place to stay with free breakfast :)." 
        order: {type:Number, required:true}                               //1
    }
);

var holidaySchema = new mongoose.Schema(
    {                                                                     //example data:
        //img: {}, //find out how to store images                         //"/images/empty.jpg"
        hasEntry: {type:Boolean, required:true},                          //"0" 
        dest: {type:String, required:true},                               //"Sample"
        year: {type:Number, min:2018, required:true},                     //"2019"
        desc: {type:String, required:true},                               //"Example description here"
        nTasks: {type:Number, required:true},                             //0
        tasks: {type:[taskSchema], required: false} //specifies a schema inside a nested document
    });

mongoose.model('Holiday', holidaySchema); 
//compiles the schema into a model
//arguments are ('nameOfModel', schemaToUse, collection in database to use//optional)
