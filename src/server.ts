import 'dotenv/config';
import { app } from './main';

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
