const http = require('http');
const fs = require('fs');
const url = require('url');
const { getAll, insertar, eliminar, modificar } = require('./consultas');

http.createServer(async (req, res) => {
   

    if (req.url === '/') {
        res.end(fs.readFileSync('index.html'));
    }
    if (req.url === '/cancion' && req.method == 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', async () => {
            const data = JSON.parse(body);
            const result = await insertar(data);
            res.estatusCode = 200;
            res.end(JSON.stringify(result));
        })
    }
    if (req.url === '/canciones' && req.method == 'GET') {
        const result = await getAll();
        res.estatusCode = 200;
        res.end(JSON.stringify(result));
    }
    if (req.url === '/cancion' && req.method == 'PUT') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', async () => {
            const data = JSON.parse(body);
            const result = await modificar(data);
            res.estatusCode = 200;
            res.end(JSON.stringify(result));
        })
    }
    
    if (req.url.startsWith('/cancion?') && req.method == 'DELETE') {
        const { id } = url.parse(req.url, true).query;
        const result = await eliminar(id);
        res.estatusCode = 200;
        res.end(JSON.stringify(result));
    }

}).listen(3000, console.log("Escucando puerto 3000"))

