const express = require('express');
const postsRouter = require('./postsRouter');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

server.use('/api/posts', postsRouter);

server.listen(5000, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
