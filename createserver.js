const http =  require('http');
const fs =  require('fs');
const { Pool, Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'members',
    password: '6789',
    port: 5432,
})
client.connect()
client.query('SELECT login,password from users', (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows)
    }
})
const server =  http.createServer(function (req,res)
{
    if(req.url === '/home')
    {
        fs.readFile('./home.html', 'utf-8', function (err, html)
        {
            if (err) throw err;
            console.log('home');
            res.write(html);
            res.end();
        })
    }
    if(req.url === '/login')
    {
        fs.readFile('./login.html', 'utf-8', function (err, html)
        {
            if (err) throw err;
            console.log('login');
            res.write(html);
            res.end();
        })
    }
})
server.listen(3000);