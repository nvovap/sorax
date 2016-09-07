# define ['extra'], (extra) -> 
# 	console.log extra.reverse 'Sometimes the same is different'


paper = Snap 800, 400
# console.log paper



style = 
	fill: '#318199'
	stroke: '#444'
	strokeWidth: 5 

circle = paper
	.circle 200, 200, 60
	.attr style

rect = paper
	.rect 300, 159, 100, 100
	.attr style

group = paper.g circle, rect
rect.attr opacity: .5
group.drag (dx) -> @transform "r#{dx},200,200"

# style = 
# 	fill: 'transparent'
# 	stroke: '#222'
# 	strokeWidth: 5 




# paper
# 	.rect 100,100,200,200
# 	.attr style
# 	.drag (dx) -> @transform "t#{dx}r#{dx}s.5"






# # Дуга
# path = paper
# 	.path "M 100,100 A100,50,30,0,1,500,200"
# 	.attr style






# style = 
# 	fill: '#387'
# 	stroke: '#222'
# 	strokeWidth: 5 


 
# path = paper
#  	.path ""
#  	.attr 
#  		stroke: '#222'
#  		fill: 'transparent'
# 		strokeWidth: 3

# pathArray = []

# updatePath = ->
# 	first = pathArray[0]
# 	pathString = "M #{first.x}, #{first.y}"
# 	for node in pathArray.slice 1
# 		pathString = pathString + "L #{node.x}, #{node.y} "
# 	path.attr d: pathString


# paper.click (e) ->
# 	if e.target.tagName is 'svg'
# 		paper
# 			.circle e.offsetX,e.offsetY,15 
# 			.attr style
# 			.data 'i', pathArray.length
# 			.data 'hello', 'It"s my string '+pathArray.length
# 			.drag (dx, dy, x, y) ->
# 				@attr
# 					cx: x
# 					cy: y
# 				console.log @data 'hello'
# 				currentNode = pathArray[@data 'i']
# 				currentNode.x = x
# 				currentNode.y = y
# 				do updatePath 

		
# 		pathArray.push
# 			x: e.offsetX
# 			y: e.offsetY

# 		do updatePath



# pathString = path.attr 'd'
# 		coords = "#{e.offsetX},#{e.offsetY}"
# 		path.attr
# 			d: if pathString then pathString + "L #{coords} " else  "M #{coords}"




# circle = paper 
# 	.circle 150,150,100 
# 	.attr style
# 	.drag()

 
 # rect = paper
 # 	.rect 300,50,300,200
 # 	.attr style

 # path = paper
 # 	.path "M 300,50 L 500,300 L 700,250 L600,100 L 500,150 Z"
 # 	.attr style
 # 	.drag()