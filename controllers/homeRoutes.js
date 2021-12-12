const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/viewpost/:id', async (req, res)=>{
try{
const post = await Post.findByPk(req.params.id, {
  include: [
    {
      model: User,
      attributes: ['username'],
    },
    {
      model: Comment,
      attributes: ['id','comment_text', 'user_id', 'post_id','date_created'],
      include: {
        model: User,
        attributes: ['username'],
      },
    },
  ]
})

const postData = post.get({ plain: true });
console.log(postData)
res.render('viewpost',{
  ...postData,
  loggedIn: req.session.logged_in 
})

}catch(err){
  res.status(500).json(err);
}

})

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//new post on the dashboard
router.get('/newpost', async (req, res) => {
  try {
    res.render('newpost', {
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// edit post on dashboard

router.get('dashboard/edit/:id', withAuth, async (req, res) => {
try{
  const dashEditdata = await Post.findOne(req.params.id,{
    include:[
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
    const edit = dashEditdata.get({ plain: true });

    res.render('edit-post', {
      edit,
      loggedIn: req.session.logged_in
 });
} catch (err) {
  res.status(500).json(err);
}
});




// Use withAuth middleware to prevent access to route
// lets get to the dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedIn: req.session.logged_in
    });
  } 
  catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
