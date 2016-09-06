var express = require('express'),
	bodyParser = require('body-parser'),
	app = express()

//console.log(app)
app.disable('x-powered-by')

var store = {
	home: {
		page: "Main page",
		content: "Home, sweet home"
	},
	about: {
		page: "About page",
		content: "Some incredibly awesome content"
	},
	downloud: {
		page: "Dounload page",
		content: "Dowload all stuff here"
	},
	profile: {
		page: "Profile page",
		content: "This is your profile"
	}
},
storyKeys =  Object.keys(store)
storyKeys.push('new')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))



app.set('view engine', 'jade')

app.use(function(request, response, next){
	console.log('%s %s', request.method, request.url)
	next()
})

app.route('/new')
	.get(function(req, res){
	//res.send('Hello there!')
		
		page = "New"

		var data = {page: "New page",
			content: "Add new page"}


		data.links = storyKeys

		res.render('new', data)
	})
	.post(function(req, res){
		var data = req.body
		if (data.pageurl && data.pagename && data.pagecontent) {
			store[data.pageurl] = {
				page: data.pagename,
				content: data.pagecontent
			}

			storyKeys.push(data.pageurl)
		} 

		res.redirect('/')
	})




app.get('/about', function(req, res){
	//res.send('Hello there!')
	
	page = "about"

	var data = store[page]

	if (!data) {
		res.redirect('/')
		return
	}

	data.links = storyKeys

	res.render('about', data)
})

app.get('/:page?', function(req, res){
	//res.send('Hello there!')
	var page = req.params.page
	if(!page) page = "home"

	var data = store[page]

	if (!data) {
		res.redirect('/')
		return
	}

	data.links = storyKeys

	// console.log(page)
	// console.log(data)

	//res.render('main', {page: data.page, content: data.content})
	//OR
	res.render('main', data)
})


var server = app.listen(3000, function(){
	console.log('Listening on 3000 port')
})