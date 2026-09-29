const http = require("node:http");
const fs = require("fs");

const server =http.createServer((req,res)=>{

    res.statusCode=200
    res.setHeader('content-type','application/json')
    const origin =req.headers.origin
    if(origin==='http://127.0.0.1:5500'){
     res.setHeader('Access-Control-Allow-Origin',origin);
    }
    if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.end()
}
    if(req.url==='/tasks'&&req.method==='GET'){
    const tasks=fs.readFileSync('./tasks.txt','utf8')//utf8 data=>string
   return res.end(tasks);
}
if(req.url==='/tasks'&& req.method==='POST'){
    let body='';
    req.on('data',(chunk)=>{//parts
        body+=chunk
    })
    req.on('end',()=>{
        const newtask=JSON.parse(body)//full string to json
        const oldtasks=fs.readFileSync('./tasks.txt','utf8')
        const task=JSON.parse(oldtasks)
        task.push(newtask)//حجزت مكان للجديد
        fs.writeFileSync('./tasks.txt',
            JSON.stringify(task))
       res.end(JSON.stringify({
        message:'task added',//to send to front
        task:newtask}))
    })};
})

server.listen(5000,()=>{
     console.log('server link is: http://localhost:5000')
})