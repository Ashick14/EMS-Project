// import db.js
const db=require('../services/db')


// logic for get all employees from the database
const getAllEmployees=()=>{
    return db.employee.find().then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    employees:result
                }
            }
            else{
                return{
                    statusCode:404,
                    message:'Employees not found'
                }
            }
        }
    )
}

// logic for add an employee to the database
const addEmployee=(id,name,age,designation,salary)=>{
    return db.employee.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:404,
                message:"Employee already exist"
            }
        }
        else{
            const newEmployee=new db.employee({id,name,age,designation,salary})
            newEmployee.save()
            return{
                statusCode:200,
                message:"Employee added successfully.."
            }
        }
    })

}

// Logic for delete an employee from the database
const deleteEmployee=(id)=>{
    return db.employee.deleteOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Employee deleted successfully"
            }
        }
        else{
            return{
                statusCode:404,
                message:"Employee not found"
            }
        }
    })
}

// Logic for view an employee from the database
const viewEmployee=(id)=>{
    return db.employee.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                employees:result
            }
        }
        else{
            return{
                statusCode:404,
                message:"Employee not found"
            }
        }
    })
}

// Logic for update an employee from the database
const updateEmployee=(id,name,age,designation,salary)=>{
    return db.employee.findOne({id}).then((result)=>{
        if(result){
            // assign updated employee details to the mongodb object
            result.id=id;
            result.name=name;
            result.age=age;
            result.designation=designation;
            result.salary=salary
            // to save the employee details to the mongodb
            result.save();
            return{
                statusCode:200,
                message:'Employee detailes updated Successfully'
            }
        }
        else{
            return{
                statusCode:404,
                message:"Employee not found"
            }
        }
    })
}

module.exports ={
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    viewEmployee,
    updateEmployee
}