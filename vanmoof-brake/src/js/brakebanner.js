class BrakeBanner {
	constructor(selector) {
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0xffffff,
			resizeTo: window
		})

		document.querySelector(selector).appendChild(this.app.view)

		this.stage = this.app.stage

		this.loader = new PIXI.Loader();
		this.loader.add('btn.png', './images/btn.png')
		this.loader.add('btn_circle.png', './images/btn_circle.png')
		this.loader.add('brake_bike.png', './images/brake_bike.png')
		this.loader.add('brake_handlerbar.png', './images/brake_handlerbar.png')
		this.loader.add('brake_lever.png', './images/brake_lever.png')
		this.loader.load()

		this.loader.onComplete.add(() => {
			this.show()
		})

	}

	resource (name) {
		return new PIXI.Sprite(this.loader.resources[name].texture)
	}
	show () {
		const brakeContainer = new PIXI.Container()

		const brakeBike = this.resource('brake_bike.png')
		brakeContainer.addChild(brakeBike)



		const brakeLever = this.resource('brake_lever.png')
		brakeLever.pivot.x = brakeLever.width
		brakeLever.pivot.y = brakeLever.height
		brakeLever.x = 780
		brakeLever.y = 950
		brakeContainer.addChild(brakeLever)

		const brakeHandlerbar = this.resource('brake_handlerbar.png')
		brakeContainer.addChild(brakeHandlerbar)


		brakeContainer.scale.x = brakeContainer.scale.y = 0.3

		this.stage.addChild(brakeContainer)


		// particle
		const particleContainer = new PIXI.Container()
		const particles = []
		this.stage.addChild(particleContainer)

		const colors = [0xf1cf54, 0xb5cea8, 0xf1cf54, 0x818181, 0x000000]

		for (let i = 0; i < 10; i++) {
			const gr = new PIXI.Graphics()
			gr.beginFill(colors[Math.floor(Math.random() * colors.length)])
			gr.drawCircle(0, 0, 6)
			gr.endFill()

			const pItem = {
				sx: Math.random() * window.innerWidth,
				sy: Math.random() * window.innerHeight,
				gr
			}

			gr.x = pItem.sx
			gr.y = pItem.sy

			particles.push(pItem)
			particleContainer.addChild(gr)
			particleContainer.rotation = Math.PI / 180 * 35
		}

		let speed = 2
		function loop () {
			for (let i = 0; i < particles.length; i++) {
				const partItem = particles[i]
				let gr = partItem.gr
				// partItem.x += speed
				speed++
				speed = Math.min(speed, 20)
				gr.y += speed
				if (gr.y >= window.innerHeight) {
					gr.y = 0
				}
				if (speed === 20) {
					gr.scale.x = 0.03
					gr.scale.y = 40
				}
			}
		}

		const actionButton = this.createButton()

		function resize () {
			brakeContainer.x = window.innerWidth - brakeContainer.width
			brakeContainer.y = window.innerHeight - brakeContainer.height

			actionButton.x = window.innerWidth - brakeContainer.width + 142
			actionButton.y = window.innerHeight - brakeContainer.height + 220
		}
		// window.onresize = resize
		window.addEventListener('resize', resize);
		resize()
		const conY = brakeContainer.y

		function start () {
			speed = 0
			gsap.ticker.add(loop)
			gsap.to(brakeBike, { duration: 0.3, alpha: 0.6 })
			gsap.to(brakeContainer, { duration: 0.3, y: conY })
			gsap.to(actionButton, {duration: 0.6, alpha: 1})
			gsap.to(actionButton.scale, {duration: 0.6, x: 0.6, y: 0.6})
		}

		function pause () {
			gsap.ticker.remove(loop)
			gsap.to(brakeBike, { duration: 0.3, alpha: 1 })
			gsap.to(brakeContainer, { duration: 0.3, y: conY + 100 })
			gsap.to(actionButton, {duration: 0.6, alpha: 0})
			gsap.to(actionButton.scale, {duration: 0.6, x: 0.2, y: 0.2})
			for (let i = 0; i < particles.length; i++) {
				const partItem = particles[i]
				let gr = partItem.gr
				gsap.to(gr, { duration: 0.3, x: partItem.sx, y: partItem.sy, ease: 'elastic.out' })
				gsap.to(gr.scale, { duration: 0.3, x: 1, y: 1, ease: 'elastic.out' })
			}
		}

		start()

		

		actionButton.interactive = true
		actionButton.buttonMode = true

		actionButton.on('mousedown', function () {
			// brakeLever.rotation = -30 * Math.PI / 180
			gsap.to(brakeLever, { duration: .6, rotation: -35 * Math.PI / 180 })
			pause()
		})

		actionButton.on('mouseup', function () {
			// brakeLever.rotation = 0
			gsap.to(brakeLever, { duration: .6, rotation: 0 })
			start()
		})


	}

	createButton () {
		const actionButton = new PIXI.Container();
		const btnImage = this.resource('btn.png')
		const btnCircleImage = this.resource('btn_circle.png')
		const btnCircleImage2 = this.resource('btn_circle.png')

		btnImage.pivot.x = btnImage.pivot.y = btnImage.width / 2
		btnCircleImage.pivot.x = btnCircleImage.pivot.y = btnCircleImage.width / 2
		btnCircleImage2.pivot.x = btnCircleImage2.pivot.y = btnCircleImage2.width / 2
		btnCircleImage.scale.x = btnCircleImage.scale.y = 0.8
		actionButton.addChild(btnImage)
		actionButton.addChild(btnCircleImage)
		actionButton.addChild(btnCircleImage2)

		gsap.to(btnCircleImage.scale, { duration: 1, x: 1.2, y: 1.2, repeat: -1 })
		gsap.to(btnCircleImage, { duration: 1, alpha: 0, repeat: -1 })
		actionButton.scale.x = actionButton.scale.y = 0.6


		this.stage.addChild(actionButton)
		return actionButton
	}
}