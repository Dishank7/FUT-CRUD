const express = require('express');
const router = express.Router();
const club = require('../models/club');


router.get('/' , (req, res , next)=>{

     club.find().then((docs)=>{
         // console.log(docs);
          res.render('home.ejs', {clubs:docs});
     })
})

// editing data req=get
router.get('/edit/:id', (req,res,next)=>{

    club.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(docs => {
        res.render('edit', { clubs: docs });
    })
    .catch(err => {
        console.error(err);
    });
})

//editing data req=post
router.post('/edit/:id', (req , res , next)=>{
    console.log(req.params.id);
    club.findByIdAndUpdate({_id:req.params.id}, req.body)
    .then(docs => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
})



//deleting data 
router.get('/delete/:id', (req, res)=>{
    club.findByIdAndDelete({_id:req.params.id})
    .then(docs=>{
     res.redirect('/');
    })
    .catch(err =>{
        console.log(err);
    })
})




//adding data
router.post('/add', (req,res,next)=>{
    const name = req.body.name;
    const players = req.body.players;
    const coach = req.body.coach;

   // console.log(name , players , coach);

   const team = new club({
    name:name,
    players:players,
    coach:coach
   })

   team.save().then(()=>{
    res.redirect('/');
   })
})

module.exports = router;