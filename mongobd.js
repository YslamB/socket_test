db.createCollection('welayatlar', {
    validator:{
        $jsonSchema:{
            required:["welayat_name"],
            properties:{
                welayat_name:{
                    bsonType:"string"
                }
            }
        }
    }
});

db.welayatlar.insertMany([
    {welayat_name:"Mary"},
    {welayat_name:"Lebap"},
    {welayat_name:"Balkan"},
    {welayat_name:"Dasoguz"}
]);



db.createCollection('students', {
    validator:{
        $jsonSchema:{
            required:["f_name", "l_name"],
            properties:{
                f_name:{
                    bsonType:"string"
                },
                l_name:{
                    bsonType:"string"
                },
                welayat:{
                    bsonType:"objectId"
                }
            }
        }
    }
});


db.students.insertMany([
    {f_name:'salam', l_name:'salamow', welayat:ObjectId("62021b28c81c0c4bab590f1e")},
    {f_name:'salam2', l_name:'salamow2', welayat:ObjectId("62021b28c81c0c4bab590f1e")},
    {f_name:'salam3', l_name:'salamow3', welayat:ObjectId("62021b28c81c0c4bab590f1e")}
]);


db.students.aggregate(
    [
        {
            $lookup:{
                from:"welayatlar",
                localField:"welayat",
                foreignField:"_id",
                as:"welyt"
            }
        },
        {
            $match:{
                _id:ObjectId("62021d20c81c0c4bab590f24")
            }
        }
    ]
);
