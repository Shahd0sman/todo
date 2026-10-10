const {EntitySchema}=require('typeorm')
const taskschema=new EntitySchema({
    name:'task',
    tableName:'tasks',
    columns:{
        id:{
            type:Number,
            primary:true,
            generated:true
        },
        title:{
            type:String
        },
         deadline:{
            type:Date
        },
         priority:{
            type:String,
            nullable:true
        } ,
        category:{
            type:String,
            nullable:true
        },
        status:{
            type:String,
            nullable:true
        }
},
  relations:{
            user:{
                type:'many-to-one',
                target:'user',
                inverseSide:'task',
                joinColumn: {
                name: 'userid'
            }
            }}
        })
module.exports=taskschema

