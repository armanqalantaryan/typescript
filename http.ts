import { MyHttp } from './server';
import * as url from "url";
const http = new MyHttp();
import * as fs from "fs";
import { IncomingMessage, ServerResponse } from 'http';
interface myRequest extends IncomingMessage{
    body?:string;
}
http.put("/abc",function (request: myRequest, response: ServerResponse)
{
    console.log(request.body)
    response.end('123');
})
http.listen(2000);


