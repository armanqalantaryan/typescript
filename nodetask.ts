import * as http from "http";
import * as fs from "fs";

const server =  http.createServer(function (req,res)
{
   
        fs.readFile('./home.html', 'utf-8', function (err, html)
        {
            if (err) throw err;
            console.log('home');
            res.write(html);
            res.end();
        })
    
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
    if(req.url === '/register')
    {
        fs.readFile('./register.html', 'utf-8', function (err, html)
        {

            if (err) throw err;
            console.log('login');
            res.write(html);
            res.end();
        })
    }
})
server.listen(3000);