import { Request, Response } from 'express';
import client from '../config/db';

let is_authenticated = false;

export function authenticateUser(req: Request, res: Response){
    const username = req.body.firstname;
    const password = req.body.password;

    client.query(`SELECT id, firstname, password FROM users WHERE username = '${username}' AND password = '${password}'`, function(err, result){
        if (!err) {          
            is_authenticated = true;
        }
    });
    client.end();
}

export function getSubject(req: Request, res: Response){
    client.query('SELECT * FROM subjects', function(err, result){
        if (!err) {
            if (is_authenticated === true){
                res.send(result.rows);
            } else {
                res.sendStatus(401);
            }
        } else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    client.end()
}

export function getSubjectsById(req: Request, res: Response){
    client.query(`SELECT * FROM subjects WHERE id=${req.params.id}`, function(err,result){
        if(!err){
            if (is_authenticated === true){
                res.send(result.rows);
            } else {
                res.sendStatus(401);
            }
        } else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    client.end();
}

export function createSubject(req: Request, res: Response){
    if (is_authenticated === true){
        client.query(`INSERT INTO subjects(name, code) VALUES('${req.body.name}','${req.body.code}')`, function(err,result){
            if(!err){
                res.send("successfully inserted");
            } else {
                console.log(err.message);
                res.sendStatus(500);
            }
        });
    }
    client.end();
}

export function updateSubject(req: Request, res: Response){
    if (is_authenticated === true){
        client.query(`UPDATE subjects SET name = '${req.body.name}', code = '${req.body.code}' WHERE id = ${req.params.id}`, function(err, result){
            if(!err){
                res.send("successfully updated");
            } else {
                console.log(err.message);
                res.sendStatus(500);
            }
        });
    }
    client.end();             
}

export function deleteSubject(req: Request, res: Response){
    if (is_authenticated === true){   
        client.query(`DELETE FROM subjects WHERE id=${req.params.id} `, (err, result)=>{
            if(!err){
                res.send('successfully deleted')
            } else {
                console.log(err.message);
                res.sendStatus(500);
            }
        });
    }
    client.end();
}
