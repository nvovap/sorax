# ================
# Util
# ================

polarToCartesian = (cx, cy, r, angle) ->
	angle = (angle - 90) * Math.PI / 180
	x: cx + r * Math.cos angle
	y: cy + r * Math.sin angle

discribeArc = (x, y, r, startAngle, endAngle, continueLine) ->
	start 	= polarToCartesian x, y, r, startAngle &= 360
	end 	= polarToCartesian x, y, r, endAngle &= 360
	large = Math.abs(endAngle - startAngle) >= 180
	alter = endAngle > startAngle
	"#{if continueLine then 'L' else 'M'}#{start.x},#{start.y} 
	 A#{r},#{r},0,
	 #{if large then 1 else 0},
	 #{if alter then 1 else 0}, #{end.x}, #{end.y}"

describeSector = (x, y, r, r2, startAngle, endAngle) ->
	"#{discribeArc x, y, r, startAngle, endAngle}
	#{discribeArc x, y, r2, endAngle, startAngle,  on}Z"	



# ================
# Class GUI
# ================
class GUI
	constructor: (buttons) ->
		@paper = Snap window.innerWidth, window.innerHeight
		@nav = new RadialNav @paper, buttons
		do @_bindEvents


			
		# ================
		# Private
		# ================

	_bindEvents: ->
		window.addEventListener 'resize', =>
			@paper.attr
				width:  window.innerWidth
				height: window.innerHeight

	
# ================
# Class RadialNav
# ================
class RadialNav
	constructor: (paper, buttons) ->
		@area = paper
			.svg 0, 0, @size=500, @size
			.addClass 'radialnav'
		@center = @size / 2
		@radOut = @size * .25 #Outer radius
		@rInner = @radOut * .35 # Inner radius
		@angle = 360 / buttons.lenght

		@container = do @area.g

		@updateButtons buttons

		# ================
		# Private
		# ================
		
	_sector: ->
		@area
			.path describeSector @center, @center, @radOut, @rInner, 0, @angle
			.addClass 'radialnav-sector'

	_button: (btn, sector) ->
		@area
			.g sector

	# ================
	# Public
	# ================

	updateButtons: (buttons) ->
		do @container.clear
		for btn, i in buttons
			button = @_button btn, @_sector()
			button.transform "r#{@angle * i},#{@center},#{@center}"
			@container.add button


# ================
# Test
# ================

gui = new GUI [
	{
		icon: 'search'
		action: -> console.log 'Opening Search'
	}
	{
		icon: 'search'
		action: -> console.log 'Opening Search'
	}
	{
		icon: 'search'
		action: -> console.log 'Opening Search'
	}
	{
		icon: 'search'
		action: -> console.log 'Opening Search'
	}
]


# gui.paper
# 	.path describeSector 200, 200, 120, 50, 0, 90
# 	.attr
# 		fill: 'transparent'
# 		stroke: '#fff'
# 		strokeWidth: 4
