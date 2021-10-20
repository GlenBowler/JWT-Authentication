//Importing modules
const express = require ( 'express' )
const bodyParser = require ( 'body-parser' )
const jwt = require('jsonwebtoken')
const app = express()

app.use(bodyParser.json())
//port for this program being delcared
const port = 8000

//Creating user: hardcoded
app.post( '/login' , (req, res) => {
    const usr = req.body.username
    const pwd = req.body.password
    //Creating user Mazvita
    if (usr === 'Mazvita' && pwd === '1'){
        payload = {
            //Assigning values to the user
            'name' : usr,
            'admin' : false,
            'routeA' : true,
            'routeB':false,
            'routeC':false
            }
            //Creating token for this user
            const token = jwt.sign( JSON .stringify(payload), 'jwt-secret' ,
            {algorithm: 'HS256' })
            res.send({ 'token' : token})
    }
   //Creating user Meagan
    else if (usr === 'Meagan' && pwd === '2') {
        payload = {
            //Assigning values to the user
            'name' : usr,
            'admin' : false,
            'routeA' : false,
            'routeB':true,
            'routeC':false
            }
            //creating token for this user
            const token = jwt.sign( JSON .stringify(payload), 'jwt-secret' ,
            {algorithm: 'HS256' })
            res.send({ 'token' : token})
    }
    //Creating user Kabelo
    else if (usr === 'Kabelo' && pwd === '3') {
        payload = {
            //Assigning values to the user
            'name' : usr,
            'admin' : false,
            'routeA' : true,
            'routeB':false,
            'routeC':true
            }
            //creating token for this user
            const token = jwt.sign( JSON .stringify(payload), 'jwt-secret' ,
            {algorithm: 'HS256' })
            res.send({ 'token' : token})
    }
    else {
        res.status(403).send({'Error Message': 'Incorrect Login'})
    }
})

//Get request for endpoint A
app.get( '/a' , (req, res) => {
    //Split the header from the token. The [1] is there to get the token after the Bearer
    const token = req.headers[ 'authorization' ].split('')[1]
    try {
        //decode the token that the user provided.
        const tokenDecode = jwt.verify(token, 'jwt-secret' );
        //if user does have access to the route return welcome to route
        if (tokenDecode.routeA === true){
            res.send({ 'Access Message' : 'You have access to route A. Welcome to route A' })
        }
        //if the user does not have access  return a error message to them
        else {
            res.status( 403 ).send({ 'Error Message' : 'You dont have access to Route A' });
        }
    } 
    catch (e) {
        res.sendStatus( 401 )
    }
});

//Get request for endpoint B
app.get( '/b' , (req, res) => {
    //Split the header from the token. The [1] is there to get the token after the Bearer
    const token = req.headers[ 'authorization' ].split('')[1]
    try {
        //decode the token that the user provided.
        const tokenDecode = jwt.verify(token, 'jwt-secret' );
        //if user does have access to the route return welcome to route
        if (tokenDecode.routeB ===true){
            res.send({ 'Access Message' : 'You have access to route B. Welcome to route B' })
        }
       //if the user does not have access  return a error message to them
        else {
            res.status( 403 ).send({  'Error Message' : 'You dont have access to Route B' });
        }
    } 
    catch (e) {
        res.sendStatus( 401 )
    }
});

//Get request for endpoint C
app.get( '/c' , (req, res) => {
    //Split the header from the token. The [1] is there to get the token after the Bearer
    const token = req.headers[ 'authorization' ].split('')[1]
    try {
        //decode the token that the user provided.
        const tokenDecode = jwt.verify(token, 'jwt-secret' );
        //if user does have access to the route return welcome to route
        if (tokenDecode.routeC===true){
            res.send({ 'Access Message' : 'You have access to route C. Welcome to route C'  })
        }
        //if the user does not have access  return a error message to them
        else {
            res.status( 403 ).send({ 'Error Message' : 'You dont have access to Route C' });
        }
    } 
    catch (e) {
        res.sendStatus( 401 )
    }
});

//Resource endpoint
app.get('/resource', (req, res) => {
    const auth = req.headers['authorization']
    //The [1] is there to get the token after the Bearer
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        res.send({'msg':`Hello, ${decoded.name}! Your JSON Web Token has been verified.`})
    }catch (err) {
        res.status(401).send({'err': 'Bad JWT!'})
    }
    })

//Admin endpoint
app.get('/admin_resource', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        if (decoded.admin){
            res.send({'msg': 'Success!'})
        }else{
            res.status(403).send({'msg': 'Your JWT was verified, but you are not an admin.'})
        }
    }
    catch (e) {
        res.sendStatus(401)
    }
})

//Listen to port
app.listen(port, () => console.log(`Now listening at http://localhost:${port}`))