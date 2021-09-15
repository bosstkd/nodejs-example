var express = require('express');
var url = require('url');
var maPage = require('./modules/myPage').myPage;
var myTemplate = 'myFirstTemplate.ejs';
var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
     	// récupérer les parametres 
		var querystring = require('querystring');
		var params = querystring.parse(url.parse(req.url).query);
		console.log(params);
	   if ('prenom' in params && 'nom' in params) {
			res.render(myTemplate,{message:'Vous vous appelez ' + params['prenom'] + ' ' + params['nom']});
		}else {
            var noms = ['Robert', 'Jacques', 'David'];
            res.render(myTemplate, {compteur: 10, noms: noms, message:'Vous devez bien avoir un prénom et un nom, non ?'});
		}
})
.get('/emit', function(req, res) {
    res.send(maPage('On emiter'));
    var EventEmitter = require('events').EventEmitter;
    var jeu = new EventEmitter();
    jeu.on('gameover', function(message){
        console.log(message);
    });
    jeu.emit('gameover', 'Vous avez perdu !', 35);
})
.get('/etage/1/chambre', function(req, res) {
    var markdown = require('markdown').markdown;
	res.send(markdown.toHTML('Un paragraphe en **markdown** !'));
})
// Express gére meme les routes dynamique
.get('/test/:myDynamic/ok', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.send(maPage('Valeur de la route dynamique : '+req.params.myDynamic));
})
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
})
.listen(8089);