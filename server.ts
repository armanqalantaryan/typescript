import * as http from "http";
import { IncomingMessage, ServerResponse } from 'http';

export class MyHttp
{
     private getmap: Map<string, Function>;
     private putmap: Map<string, Function>;
     private postmap: Map<string, Function>;
     private  MyServer:http.Server;
     async body(req:IncomingMessage)
     {
      let buff: string = '';
        return new Promise((resolve, reject) => {
          req.on('data', function (chunk) {
            buff += chunk.toString();

          });
          req.on('end', function () {
            resolve(buff);
          });
          Object.assign(req, {
            body: buff
          });
        });
     }
     constructor()
    {
        this.getmap = new Map();
        this.putmap = new Map();
        this.postmap = new Map();
        this.MyServer = http.createServer(async (req, res) => {
          console.log(req.url);
          if (!req.url)
            return;

          let callback: undefined | Function;
          switch (req.method) {
            case 'GET':
              if (!this.getmap.has(req.url)) {
                console.log('no url')
                return;
              }
              callback = this.getmap.get(req.url);
              if (callback)
                callback(req, res);
              break;
            case 'PUT':
              if (!this.putmap.has(req.url)) {
                console.log('no url')
                return;
              }
              callback = this.putmap.get(req.url);
              await this.body(req);
              if (callback)
                callback(req, res);
              break;
            case 'POST':
              if (!this.postmap.has(req.url)) {
                console.log('no url')
                return;
              }
              callback = this.postmap.get(req.url);
              await this.body(req);
              if (callback)
                callback(req, res);
          }
        });
    }
    get(url:string,callback: Function)
    {
     this.getmap.set(url,callback);
    }
    put(url:string,callback: Function)
    {
        this.putmap.set(url,callback);
    }
    post(url:string,callback:Function)
    {
        this.postmap.set(url,callback)
    }
    listen(port:number)
    {
        this.MyServer.listen(port);
    }
};
