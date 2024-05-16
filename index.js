const express = require('express');
const app = express();

const PORT = 5000;

app.use(express.json());

const router = express.Router();

let users = [
  {
    id:'3',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
  },
  {
    id:'4',
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
  },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    // console.log(users);
    res.send(users);
})

// Adding users to our mock database
const id = 0;

router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: id+1 });

    res.send(`${user.first_name} has been added to the Database`);
})  

// get a particular user
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
    res.status(200).send('User found');
});

// delete the user from the database
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id)

  res.send(`${id} deleted successfully from database`);
});

// Make a PATCH request to the database
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, email} = req.body;

  const user = users.find((user) => user.id === id)

  if(first_name) user.first_name = first_name;
  if(last_name) user.last_name = last_name;
  if(email) user.email = email;

  res.send(`User with the ${id} has been updated`)
  res.status(200);
  
});

app.use('/users', router);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));