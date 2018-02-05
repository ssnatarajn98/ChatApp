import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {version} from '../package.json'
import WebSocketServer, {Server} from 'uws';

const PORT = 3000;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'  
}));
app.use((req,res)=> {
		res.json({
			version: version
		});
});
app.wss =  new Server({
	server: app.server 
});

app.wss.on('connection',(connection)=>{
	console.log("New Client connected");
	// listening even new message from client.
	connection.on('message', (message)=>{
		console.log(" Got new message from client, the message is:", message);
	//after getting new message from client, we send back to the client with new message
	connection.send('Hi Cleint, nice to meet you.');
	});
		
});

app.server.listen(process.env.PORT || PORT, () => {
        console.log(`App is running on port ${app.server.address().port}`);
});

export default app;