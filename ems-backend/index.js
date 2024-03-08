// import express
const express=require("express")

// import cors
const cors=require('cors')

const logic=require('./services/logics')
// create an application using express
const emsServer=express()

// using cors to connect frontend port
emsServer.use(cors({
    origin:'http://localhost:3000'
}))

// create a middleware for parsing json data
emsServer.use(express.json())

// Define a port number
emsServer.listen(8000,()=>{
    console.log("emsServer listening on the port 8000");
})

// API call for getting all employee details
emsServer.get('/get-all-employees',(req,res)=>{
        logic.getAllEmployees().then((response)=>{
            res.status(response.statusCode).json(response)
        })
})

// API call for add an employee details
emsServer.post('/add-employee',(req,res)=>{
    logic.addEmployee(req.body.id,req.body.name,req.body.age,req.body.designation,req.body.salary).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

// API call for delete an employee
emsServer.delete('/delete-employee/:id',(req,res)=>{
    logic.deleteEmployee(req.params.id).then((response=>{
        res.status(response.statusCode).json(response)
    }))
})

// API call for view an employee
emsServer.get('/view-employee/:id',(req,res)=>{
    logic.viewEmployee(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

// API call for edit an employee
emsServer.post('/update-employee/:id',(req,res)=>{
    logic.updateEmployee(req.params.id,req.body.name,req.body.age,req.body.designation,req.body.salary).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})