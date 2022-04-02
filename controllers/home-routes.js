// This file will contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
 
// -- The / designated home page
router.get('/', (req, res) => {
  //  console.log(req.session); do not uncomment in production
   Post.findAll({
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
        //  console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        //  console.log(dbPostData[0].get({ plain: true}));
        //  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        
         // res.render('homepage', dbPostData[0].get({ plain: true }));  

         const posts = dbPostData.map(eachdbpost => eachdbpost.get({ plain: true }));
        //  res.render('homepage',  { posts } );  
        res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn //conditional rendering
        });
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
 }); 

// -- Route to login.handlebars 
router.get('/login', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/');
      return;
   }
   res.render('login');
}); 


// -- Route to signup.handlebars 
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
     res.redirect('/');
     return;
  }
  res.render('signup');
}); 

// // // -- Quick /post/:id Test Only
// // router.get('/post/:id', (req, res) => {
// //    const post = {
// //      id: 1,
// //      post_content: 'How Come It Does not Show Comments. Please Help Me Out',
// //      title: 'Single Post Issue',
// //      created_at: new Date(),
// //     //  vote_count: 10,
// //      comments: [{}, {}],
// //      user: {
// //        username: 'test_user'
// //      }
// //    };
// //  
// //    res.render('single-post', { post });
// // });

router.get('/post/:id', (req, res) => {
   Post.findOne({
     where: {
       id: req.params.id
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
        //  console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        //  console.log(dbPostData.get({ plain: true}));
        //  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
 
       
      const post = dbPostData.get({ plain: true });
  
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
   })
   .catch(err => {
   console.log(err);
   res.status(500).json(err);
   });
});

module.exports = router;
