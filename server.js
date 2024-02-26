import express from 'express';
import path from 'path';

const app = express();
const port = 3000;
const publicDir = path.join(process.cwd(), '/dist');

app.use(express.static(publicDir));

app.get('/*', (req, res) => {
  res.sendFile(`${publicDir}/index.html`);
});

app.listen(port, () => {
  /* eslint no-console: 0 */

  console.log(`Server is up on port ${port}`);
});
