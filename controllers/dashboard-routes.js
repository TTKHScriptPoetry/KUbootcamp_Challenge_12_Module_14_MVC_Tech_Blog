const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth'); 

router.get('/', withAuth, (req, res) => {
   Post.findAll({
     where: {
       // use the ID from the session
       user_id: req.session.user_id
     },
     attributes: [
       'id',
       'post_content',
       'title',
       'created_at'
     ],
     include: [
       {
         model: Comment,
         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
         include: {
           model: User,
           attributes: ['username']
         }
       },
       {
         model: User,
         attributes: ['username']
       }
     ]
   })
     .then(dbPostData => {
       // serialize data before passing to template
       const posts = dbPostData.map(post => post.get({ plain: true }));
       res.render('dashboard', { posts, loggedIn: true });
     })
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'post_content',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        console.log(post);
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/edit/:id',withAuth , (req, res) => {
  // delete one product by its `id` value
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
    res.status(404).json({ message: 'No post found with this id' });
    return;
    }
    res.json(dbPostData);  
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router; 