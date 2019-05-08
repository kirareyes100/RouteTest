const express = require('express');

const Joi = require('joi');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('This is the beginning home page');
})


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

const data = [{ id : 1, name : 'Felix okafor'}, {id : 2, name : 'John Okafor'}, {id : 3, name : 'Junior Okafor' }];


app.get('/go', (req, res) => {
    res.send(data);
})


app.get('/go/:id', (req, res) => {
    const sorted = data.find(c => c.id === parseInt(req.params.id));
    if(!sorted) res.status(404).send('This ID number can not be found')
    res.send(sorted);
})

const courses = [{id : 1, name : "Felix"}, {id : 2, name : "John"}, {id : 3, name : "Ekene"}];

app.get('/api/courses', (req, res) => {
    res.send(courses); 
})




app.get('/api/courses/:id', (req, res) => {
    const individualCourse = courses.find( c => c.id === parseInt(req.params.id));
    if(!individualCourse) res.status(404).send("The course with the ID can not be found");
        res.send(individualCourse);
});
 

app.put('/api/courses/:id', (req, res) => {
    const individualCourse = courses.find(c => c.id === parseInt(req.params.id));
    if(!individualCourse) {
        res.status(404).send('The ID requested is not found');
    } 


})




app.post('/api/courses', (req, res) => {

    const schema = {
        //Joi validators: It must be a tring. it must not have a string with a minimum of three and the inout is required 
        name : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);

    console.log(result);

    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be minimum of three characters')
        return
    }
    const addcourse = {
        id : courses.length + 1,
        name : req.body.name
    }

    courses.push(addcourse);
    res.send(courses);

})



//Update course Conditions
//Validate course by validating the course ID
//if Invalid send the bad request status 400

//Validate the course input 
//if the input is invalid send the 404 bad request status code 

//update the courses 
 