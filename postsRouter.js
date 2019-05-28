const router = require('express').Router();
const db = require('./data/db');

router.post('/', (req, res) => {
  const post = req.body;
  db.insert(post)
    .then(post => {
      if (!req.body.title.length || !req.body.contents.length) {
        res.status(404).json({
          message: 'Please provide title and contents for the post',
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'There was an error while saving the post to the database',
      });
    });
});

router.post('/:id/comments', (req, res) => {
  let comment = req.body;
  const id = req.params.id;
  comment.post_id = id;
  db.insertComment(comment)
    .then(post => {
      res.status(201).json(comment);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the comment to the database',
      });
    });
});

router.get('/', (req, res) => {
  db.find(req.query)
    .then(allPosts => {
      res.status(200).json(allPosts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error retrieving posts',
      });
    });
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved',
      });
    });
});

router.get('/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(deletedPost => {
      if (deletedPost > 0) {
        res.status(200).json({
          message: `The post with id: ${req.params.id} has been deleted`,
        });
      } else {
        res.status(404).json({
          error: 'The post with the specified ID does not exist.',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'The post could not be removed',
      });
    });
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'The post information could not be modified',
      });
    });
});

module.exports = router;
