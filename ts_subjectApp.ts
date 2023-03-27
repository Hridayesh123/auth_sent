import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import subjectRoutes from './routes_container/ts_subjectRoutes';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  token?: string;   
}

const app = express();
const key="key";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function(req,res){
  
  const user={
        firstname : req.body.firstname,
        password : req.body.password
    }
    jwt.sign({user}, key, function(err, token){
        res.json({token});
    })  
  });

app.post('/profile', verifyToken,function(req: CustomRequest, res: Response){
  jwt.verify(req.token,key,function(err, authData){
    if(!err){
      res.json({
        message:" authorized",
        authData
      })
    }
  })
})

function verifyToken(req,res,next){
    const bearerHeader =  req.header['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
}



app.use('/subject', subjectRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
