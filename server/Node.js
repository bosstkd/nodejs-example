var http = require('http');
var url = require('url');
var maPage = require('./modules/myPage').myPage;

var newVisiteur = function(req, res) {
	// récupérer l'url de la page
	var page = url.parse(req.url).pathname;
	    console.log(page);
	
  res.writeHead(200, {"Content-Type": "text/html"});
   if (page == '/') {
	   	// récupérer les parametres 
		var querystring = require('querystring');
		var params = querystring.parse(url.parse(req.url).query);
		console.log(params);
	   if ('prenom' in params && 'nom' in params) {
			res.write(maPage('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']));
		}else {
			res.write(maPage('Vous devez bien avoir un prénom et un nom, non ?'));
		}
    }
    else if (page == '/emit') {
        res.write(maPage('On emiter'));
		var EventEmitter = require('events').EventEmitter;
		var jeu = new EventEmitter();
		jeu.on('gameover', function(message){
			console.log(message);
		});
		jeu.emit('gameover', 'Vous avez perdu !', 35);
    }
    else if (page == '/etage/1/chambre') {
        res.write(maPage('Hé ho, c\'est privé ici !'));
    }else{
		res.writeHead(404, {"Content-Type": "text/html"});
		// faire apparaitre le message en utilisant markdown 
		var markdown = require('markdown').markdown;
		console.log(markdown.toHTML('Un paragraphe en **markdown** !'));
		res.write(markdown.toHTML('Un paragraphe en **markdown** !'));
	}	
   res.end();
};

var server = http.createServer();
server.on('request', newVisiteur);

//server.on('close', function() { // On écoute l'évènement close
//    console.log('Bye bye !');
//})
server.listen(8089);

//server.close(); // Arrête le serveur. Déclenche l'évènement close