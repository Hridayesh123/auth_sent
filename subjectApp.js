const express =  require('express');
const bodyParser =  require('body-parser');
const app = express();
const subjectRoutes = require('./routes_container/subjectRoutes')
const authenticateUser = require('./function_container/subjectFunctions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/login', authenticateUser);
app.use('/subject', subjectRoutes);

app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})
