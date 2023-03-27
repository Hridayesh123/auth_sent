import { Request, Response } from 'express';
import client from '../config/db';
import jwt from 'jsonwebtoken';

const key="key";

export function createToken(req,res){
  
    const user={
          firstname : req.body.firstname,
          password : req.body.password
      }
      jwt.sign({user}, key, function(err, token){
          res.json({token});
      })  
    }

export function getSubject(req: Request, res: Response){
    client.query('SELECT * FROM subjects', function(err, result){
        if (!err) {
            res.send(result.rows);
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
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.sendStatus(500);
        }
    });
    client.end();
}

export function createSubject(req: Request, res: Response){
  
        client.query(`INSERT INTO subjects(name, code) VALUES('${req.body.name}','${req.body.code}')`, function(err,result){
            if(!err){
                res.send("successfully inserted");
            } else {
                console.log(err.message);
                res.sendStatus(500);
            }
        });
    
    client.end();
}

export function updateSubject(req: Request, res: Response){
    
        client.query(`UPDATE subjects SET name = '${req.body.name}', code = '${req.body.code}' WHERE id = ${req.params.id}`, function(err, result){
            if(!err){
                res.send("successfully updated");
            } else {
                console.log(err.message);
                res.sendStatus(500);
            }
        });
    
    client.end();             
}

export function deleteSubject(req: Request, res: Response){
     
        client.query(`DELETE FROM subjects WHERE id=${req.params.id} `, (err, result)=>{
            if(!err){
                res.send('successfully deleted')
            } else {
                console.log(err.message);
                res.sendStatus(500);
            }
        });
    
    client.end();
}
