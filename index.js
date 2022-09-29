const express = require('express');

// console.log(express);
const server = express();

//inform of type now is JSON
server.use(express.json());

//Query params = ?nome=NodeJS
//Route params = /curso/2
//Request body = { name: NodeJS, type: 'Back-end'}

//CRUD = Create, Read, Update and Delete

const courses = ['NodeJS', 'Java Script', 'Elixir', 'React Native'];

//midlewar Global
server.use((req, res, next) => { //next used for go ahead the request
    console.log(`Url request: ${req.url}`);
    return next();
});

//midlerwar for validade params
function checkReq(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ erro: "Name of course is required" });
    }

    return next();
}

function checkIndexCourse(req, res, next) {
    const course = courses[req.params.index];
    if (!course) {
        return res.status(400).json({ erro: "Course not found" });
    }

    req.course = course;
    return next();
}


//rotes
//http://localhost:3000/courses

server.get('/courses', (req, res) => {
    return res.json(courses);
});

// server.get('/courses', (req, res) => { //of request
// server.get('/courses/:id', (req, res) => { //of result
server.get('/courses/:index', checkIndexCourse, (req, res) => { //of result
    // console.log("Acess complete");
    // return res.send('Hello world')
    // const name = req.query.name // of request
    // const id = req.params.id; //of result
    // const { index } = req.params; //of result



    // return res.json({ course: `Learning ${name}` }) //exemple request
    // return res.json({ course: `Course ${id}` });//exemple result
    // return res.json(courses[index]);//exemple result
    return res.json(req.course);//exemple result
})

//create a new courses
// server.post('/courses', (req, res) => {
server.post('/courses', checkReq, (req, res) => {
    const { name } = req.body;
    courses.push(name);

    return res.json(courses);
});

//Update an course
// server.put('/courses/:index', (req, res) => {
server.put('/courses/:index', checkReq, checkIndexCourse, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    courses[index] = name;

    return res.json(courses);

});


//delete any courses
server.delete('/courses/:index', checkIndexCourse, (req, res) => {
    const { index } = req.params;

    courses.splice(index, 1);
    // return res.json(courses);
    return res.send();
});

server.listen(3000);