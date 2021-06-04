/*
    CIT 281: LAB 05
    Meagan Kiefer
*/

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];

// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax

// student route
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

// Student id route
fastify.get("/cit/student/:id", (request, reply) => {
    // get the id
    let studentIDFromClient = request.params.id;

    // get the student associated with the id given from the students array
    let studentRequested = null;

    for (studentInArray of students) {
        if (studentInArray.id == studentIDFromClient) {
            studentRequested = studentInArray
            break;
        }
    }

    
//send student data found in step 2 to the client
    if( studentRequested != null) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(studentRequested);
    } else {
        reply
        .code(404)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("<h1>No student with that given ID was found.</h1>");
    }
  });

// Unmatched/ wild card route
fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>At Unmatched Route!</h1>");
  });

// Add a student
fastify.post("/cit/student/add", (request, reply) => {

    let userData = JSON.parse(JSON.stringify(request.body));
    console.log(userData)
    const { last, first } = userData;
    
    //get the max id from the current array
    
    let maxId = Math.max.apply(Math, students.map(function(students) {
      return students.id; 
    }));
    //let min = Math.min(...arr);

    //console.log(maxId)
    let newID = maxId + 1
    // make a new student object, composed of the user data and max id + 1
    //insert the student object created above into "students" array
    let newUser = { newID, last, first }
   // console.log(userData)
    students.push(newUser)
    // return that object to the client
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(newUser); 
  });

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
}); 