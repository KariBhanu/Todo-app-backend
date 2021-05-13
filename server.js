const express = require("express");
const cors = require("cors");
const mysqlConnection = require("./connection");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send('Hello from server');
})
//create
app.post('/addTodo', (req, res) => {
   console.log(req.body);
   let todo = req.body;
   mysqlConnection.query('INSERT INTO todolist VALUES (?,?,?)', [todo.id,todo.content,todo.completed],
    (err, rows, fields) => {
            if (!err)
                res.send('Added successfully.');
            else
                console.log(err);
        }) 
});
//read
app.get('/getTodos',(req,res)=>{
    mysqlConnection.query('SELECT * FROM todolist', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})

//update
app.put('/update', (req, res) => {
    let todo = req.body;
    var sql = "UPDATE todolist SET Content = ?, Completed = ? WHERE ID = ?;";
    mysqlConnection.query(sql, [todo.content,todo.completed,todo.id], (err, rows, fields) => {
        if (!err)
            {setTimeout(()=>{
                res.send('Updated successfully.')
            },1000);}
        else
            console.log(err);
    })
    console.log(todo);
});

//delete
app.delete('/remove/:id',(req,res)=>{
    console.log(req.params.id);
    mysqlConnection.query('DELETE FROM todolist WHERE ID = ?', [req.params.id], (err, rows, fields) => {
                if (!err)
                   {setTimeout(()=>{
                        res.send('Deleted successfully.')
                    },1000);}
                else
                    console.log(err);
            })
})


app.listen(process.env.PORT,()=>{
    console.log("Server is listening on - " + process.env.PORT);
});

