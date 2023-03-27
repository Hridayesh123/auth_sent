const client = require('../config/db');
var is_authenticated = false;

function authenticateUser(req,res){
    const username = req.body.firstname;
    const password = req.body.password;

    client.query(`SELECT id, firstname, password FROM users WHERE username = ${username} AND password = ${password}`, function(err, result){
        if (!err) {          
           
              is_authenticated = true;
                    
        }
    });
    client.end();
}

function getSubject(req, res){
  client.query('SELECT * FROM subjects', function(err, result){
    if (!err) {
        if (is_authenticated = true){
      res.send(result.rows);
        }
    }
  });
  client.end()
}

function getSubjectsById(req,res){
    
    client.query(`SELECT * FROM subjects WHERE id=${req.params.id}`, function(err,result){
        if(!err){
            if (is_authenticated = true){
                res.send(result.rows);
                  }
        }
        else{
            console.log(err.message);
        }
    });
    client.end();
}


function createSubject(req,res){
    if (is_authenticated = true){
        client.query(`INSERT INTO subjects(name, code)
        VALUES('${req.body.name}','${req.body.code}')`, function(err,result){
            if(!err){
                res.send("successfully inserted");
            }
            else{
                console.log(err.message);
            }
        });
    }
    client.end();
}

function updateSubject(req,res){
    if (is_authenticated = true){
        client.query(`UPDATE subjects
        SET name = '${req.body.name}',
            code = '${req.body.code}'

        WHERE id = ${req.params.id}`, function(err, result){
            if(!err){
                res.send("successfully updated");
            }
            else{
                console.log(err.message);
            }
        });
    }
    client.end();             
}

function deleteSubject(req,res){
    if (is_authenticated = true){   
        client.query(`DELETE FROM subjects WHERE id=${req.params.id} `, (err, result)=>{
            if(!err){
                res.send('successfully deleted')
            }
            else{ console.log(err.message) }
        });
    }
    client.end();

}

module.exports = {
    getSubject,
    getSubjectsById,
    createSubject,
    updateSubject,
    deleteSubject,
    authenticateUser
  };