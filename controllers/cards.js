const knex = require("../db/knex.js");

module.exports = {

  index: function(req, res) {
    knex('cards').then((result)=>{
      if(!req.session.cards){
        req.session.cards = [];
      }
      res.render('index', {cards:result, deck:req.session.cards})
    })
  },

  new: (req, res)=>{
    knex('cards').insert({
      mana: req.body.mana,
      attack: req.body.attack,
      health: req.body.health,
      description: req.body.description
    }).then(()=>{
      res.redirect('/');
    })
  },

  add: (req, res)=>{

    knex('cards').where('id', req.params.id).then((result)=>{
      req.session.cards.push(result[0])
      res.redirect('/')
    })
  },

  remove: (req, res)=>{
    let deck = req.session.cards;
    if(deck.length == 1){
      req.session.cards = [];
      res.redirect('/')
      return;
    }
    for(let i = 0; i < deck.length; i++){
      if(deck.id = req.params.id){
        deck.splice(i, 1)
        res.redirect('/')
        return;
      }
    }
    res.redirect('/')
  }
}
