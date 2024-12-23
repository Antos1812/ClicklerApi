import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;  

app.use(express.json());
app.use(express.static("public"));
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Serwer jest na: http://localhost:${PORT}`);
});
