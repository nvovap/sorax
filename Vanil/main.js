// var http = require('http'),
// 	server = http.createServer(function(req, res){
// 		console.log(req.headers)
// 		console.log(req.url)

// 		res.writeHead(200, {'Content-Type': 'text/plain'})
// 		res.write('Hello http')
// 		res.end()
// 	})


// server.listen(8000)

// console.log('Listening on port 8000')



// var net = require('net')

// var server = net.createServer(function(socket){

// 	console.log('Connected '+socket.remoteAddress+' '+socket.remotePort )

// 	socket.on('data', function(data){
// 		console.log(data)
// 		socket.write(String(data).toUpperCase())
// 	})

// 	socket.on('close', function(){
// 		console.log('Connection closed')
// 	})


// }) 


// server.listen(8000)

// console.log('Listening on port 8000')


//console.log(net.Socket.prototype)


// var ReadableStream =  require('stream').Readable,
// 	stream = new ReadableStream(),
// 	data = ('If you have ever set up new devices, you know that it can require a decent amount of time to configure them. This is especially true if employees have multiple devices. After setting  up the devices, keeping an inventory of them').split(' ')

// stream._read = function(){
// 	if (data.length){
// 		setTimeout(function(){
// 			stream.push(data.shift() + ' ')
// 		}, 200)
// 	} else {
// 		stream.push(null)
// 	}
	
// }

// stream.pipe(process.stdout)


// setTimeout(function(){
// 	console.log(" World!!");
// }, 1000)


// console.log("Hello");


// var counter = 0 

// setInterval(function(){
// 	console.log("Counter value " + counter++)
// }, 5000)



//console.log(global.process)

// var arg = global.process.argv[2]


// if (arg) {
// 	console.log(arg)
// }


// var fs = require('fs'),
// 	path = require('path')

// console.log(process.cwd())

// var currentFoolder =  'new_foolder'

// fs.readdir(currentFoolder, function(err, files){
// 	process.chdir(currentFoolder)
	
// 	console.log(process.cwd())

// 	files.forEach(function(file){
// 		var ext = path.extname(file) 
// 		var nameFile = path.basename(file, ext)
		

// 		//fs.renameSync(currentFoolder+'/'+file, currentFoolder+'/'+nameFile+'.css')

// 		fs.renameSync(file, nameFile+'.html')
// 	})

	
// })


// fs.mkdirSync('new_foolder')

// fs.renameSync('hello.txt', 'new_name.txt')

// fs.renameSync('new_name.txt', 'new_foolder/new_name.txt')



// console.log(fs)

// fs.writeFile('hello.txt', '<HTML></HTML>',  function(err){
// 	if (err) throw err
// })


// fs.appendFile('hello.txt', '<HTML></HTML>',  function(err){
// 	if (err) throw err
// })

// console.log(fs.readFileSync('hello.txt'))

// console.log(fs.readFileSync('hello.txt', {encoding: 'utf-8'}))
////OR
// console.log(''+fs.readFileSync('hello.txt'))


//var buffer = new Buffer('Sometime the same is different, but mostly its the same', 'utf-8')

//console.log(buffer)

// var octets = [].slice.call(buffer)

// console.log(octets)

// octets.forEach(function(octet){
// 	process.stdout.write('00000000'+octet.toString(2).slice(-8)+',')
// })


// octets.forEach()(function(octet){
// 	process.stdout.write(octer.toString(2))
// })