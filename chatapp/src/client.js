
const WebSocket = require('uws');
const ws = new WebSocket('ws://localhost:3000');

ws.on('open', ()=>{
	console.log("Successful convected to the server.");
	// send a new message from this clientt to server/
	ws.send('Hello server my name is client.')
	
	ws.on('message',(message)=>{
		//listen any message form the server
		console.log("Got back message from the server with message is: ",message);
	}
		);
});