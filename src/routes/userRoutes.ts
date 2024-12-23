import { Router, Request, Response } from "express";
const router = Router();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  points: number;
}
const users: User[] = [
  { id: 1, firstName: "Antoni", lastName: "Jastrzębski", age: 16, points: 0 },
  { id: 2, firstName: "Szymon", lastName: "Gabrek", age: 34, points:0 },
];

// GET ALL
router.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// GET ONE BY ID
router.get("/users/:id", (req: Request, res: Response) => {``
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
// CREATE
router.post("/users", (req: Request, res: Response) => {
  const newUser: User = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    points: req.body.points,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE BY ID using put
router.put("/users/:id", (req: Request, res: Response) =>{
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if(userIndex === -1) {
    res.status(404).json({message: "User not found"});
  } else {
  const updateUser: User = {
    ...users[userIndex],
    ...req.body,
  };
  users[userIndex] = updateUser;
  res.json(updateUser);
 }
});

// DELETE BY ID
router.delete("/users/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ message: "User not found" });
  } else {
    users.splice(userIndex, 1);
    res.status(204).send();
  }
});

// UPDATE POINTS BY ID
router.put("/users/:id/points", (req: Request, res: Response)=> {
  const userId = parseInt(req.params.id);
  const { points } = req.body;
  const user = users.find((user) => user.id === userId);

  if(user){
    user.points += points;
    res.json({message:"Points udpated", user});
  } else {
    res.status(404).json({message:"User not found"});
  }
})

export default router;