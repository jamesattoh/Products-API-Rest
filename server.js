const http = require('http');
const app = require('./app');

//prend une valeur (chaine ou numéro) et la convertit en un numéro de port valide
const normalizePort = val => {
  
  const port = parseInt(val, 10); 
  if (isNaN(port)) { 
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

// recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => { 
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges.');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use.');
    process.exit(1);
    break;
  default:
    throw error;
}
};

const server = http.createServer(app);

//Ces lignes de code ajoutent des gestionnaires d'événements au serveur HTTP pour gérer les
// erreurs et consigner les informations lorsque le serveur commence à écouter sur le port spécifié.
server.on('error', errorHandler);

server.on('listening', () => { 
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); //Démarre le serveur et le fait écouter sur le port spécifié.