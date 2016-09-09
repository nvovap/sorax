iconsPath = 'icons.svg'
iconsPathHome = 'HOME.svg'

# ================
# Util
# ================

Snap.plugin (Snap, Element) ->
	Element::hover = (f_in, f_out, s_in, s_out) ->
		@mouseover f_in, s_in
			.mouseout f_out or f_in, s_out or s_in


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

animate = (obj, index, start, end, duration, easing, fn, cb) ->
	do (obj.animation ?= []) [index]?.stop 
	obj.animation[index] = Snap.animate start, end, fn, duration, easing, cb


# ================
# Class GUI
# ================
class GUI
	constructor: (buttons) ->
		@paper = Snap window.innerWidth, window.innerHeight

		#Snap.load iconsPathHome, (icons) => 
		Snap.load iconsPath, (icons) => 
			@nav = new RadialNav @paper, buttons, icons
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
	constructor: (paper, buttons, icons) ->
		@area = paper
			.svg 0, 0, @size=500, @size
			.addClass 'radialnav'
		@center = @size / 2
		@radOut = @size * .25 #Outer radius
		@rInner = @radOut * .35 # Inner radius
		@angle = 360 / buttons.length 

		@container = do @area.g

		@updateButtons buttons, icons

		# ================
		# Private
		# ================
	_animateButtonHover: (button, start, end, duration, easing, cb) ->
		animate button, 1, start, end, duration, easing, ((val) => button[0].attr d: describeSector @center, @center, @radOut - val*10, rInner, 0, @angle), cb

	_sector: ->
		@area
			.path describeSector @center, @center, @radOut, @rInner, 0, @angle
			.addClass 'radialnav-sector'

	_button: (btn, sector, icon, hint) ->
		@area
			.g sector, icon, hint
			.hover -> el.toggleClass 'active' for el in [@[0], @[1], @[2]]
			.hover @_buttonOver(@), @_buttonOut(@) 

	_buttonOver: (nav) -> ->
		nav._animateButtonHover @, 0, 1, 200, mina.easeinout
		@[2].removeClass 'hide'

	_buttonOut: (nav) -> ->
		nav._animateButtonHover @, 1, 0, 2000, mina.elastic, (-> 
				@addClass 'hide').bind @[2]
		


	_icon: (btn, icons) ->
		icon = icons
			.select "##{btn.icon}"
			.addClass 'radialnav-icon'
		bbox = do icon.getBBox
		console.log bbox
		icon.transform "
			T#{@center - 33*0.7 / 2},#{@center - @radOut + @rInner - 12 }
			R#{@angle / 2},#{@center},#{@center}S 0.7
			"

	_hint: (btn) ->
		hint = @area
			.text 0,0,btn.icon
			.addClass 'radialnav-hint hide'
			.attr textpath: discribeArc @center, @center, @radOut, 0, @angle
		hint.select('*').attr startOffset: '50%'
		hint


	# ================
	# Public
	# ================

	updateButtons: (buttons, icons) ->
		do @container.clear
		for btn, i in buttons
			button = @_button btn, @_sector(), @_icon(btn, icons), @_hint(btn)

			#button = @_button btn, @_sector(), icons, icons
			button.transform "r#{@angle * i},#{@center},#{@center}"
			@container.add button



 
# ================
# Test
# ================

gui = new GUI [
	{
		icon: 'HOME'
		action: -> console.log 'Opening Search'
	}
	{
		icon: 'CART'
		action: -> console.log 'Opening Search'
	}
	{
		icon: 'CAMERA'
		action: -> console.log 'Opening Search'
	}
	{
		icon: 'BLUETOOTH'
		action: -> console.log 'Opening Search'
	}
	{
		icon: 'BATTERY'
		action: -> console.log 'Opening Search'
	}
	
]


# gui.paper
# 	.path describeSector 200, 200, 120, 50, 0, 90
# 	.attr
# 		fill: 'transparent'
# 		stroke: '#fff'
# 		strokeWidth: 4
