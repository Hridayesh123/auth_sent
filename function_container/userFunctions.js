const client = require('../config/db');

function getUsers(req, res) {
  client.query('SELECT * FROM users', (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end()
}

function getById(req,res){
    const now = new Date().toISOString();
    
    client.query(`INSERT INTO users(firstname, lastname, email, password, datecreated, datemodified)
    VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.password}', '${now}', '${now}')`, function(err,result){
        if(!err){
            res.send("successfully inserted");
        }
        else{
            console.log(err.message);
        }
    });
    client.end;
}

function createUser(req,res){
    const now = new Date().toISOString();
    
    client.query(`INSERT INTO users(firstname, lastname, email, password, datecreated, datemodified)
    VALUES('${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.password}', '${now}', '${now}')`, function(err,result){
        if(!err){
            res.send("successfully inserted");
        }
        else{
            console.log(err.message);
        }
    });
    client.end;
}

function updateUser(req,res){
    const now = new Date().toISOString();

    client.query(`UPDATE users
    SET firstname = '${req.body.firstname}',
    lastname = '${req.body.lastname}',
    email = '${req.body.email}',
    password = '${req.body.password}',
    datecreated = '${now}',
    datemodified = '${now}'
    
    WHERE id = ${req.params.id}`, function(err, result){
        if(!err){
            res.send("successfully updated");
        }
        else{
            console.log(err.message);
        }
    });
    client.end;             
}

function deleteUser(req,res){
        
    client.query(`DELETE FROM users WHERE id=${req.params.id} `, (err, result)=>{
        if(!err){
            res.send('successfully deleted')
        }
        else{ console.log(err.message) }
    });
    client.end;

}

module.exports = {
    getUsers,
    getById,
    createUser,
    updateUser,
    deleteUser
  };

