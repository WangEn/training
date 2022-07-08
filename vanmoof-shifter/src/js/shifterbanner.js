class ShifterBanner {
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
		this.loader.add('shifter_bike.jpg', './images/shifter_bike.jpg')
		this.loader.add('shifter_spokes.png', './images/shifter_spokes.png')
		this.loader.add('shifter_uncovered.png', './images/shifter_uncovered.png')
		this.loader.add('shifter_covered.png', './images/shifter_covered.png')
		this.loader.add('shifter_clear.png', './images/shifter_clear.png')


		this.loader.load()
    this.loader.onComplete.add(() => {
			this.show()
		})
  }

  resource (name) {
    return new PIXI.Sprite(this.loader.resources[name].texture)
  }

  show () {
    const shifterContainer = new PIXI.Container()

    const shifterBike = this.resource('shifter_bike.jpg')
    // shifterBike.scale.x = shifterBike.scale.y = 0.6
    // shifterContainer.addChild(shifterBike)

    const shifterSpokes = this.resource('shifter_spokes.png')
    shifterSpokes.scale.x = shifterSpokes.scale.y = 0.6
    shifterSpokes.alpha = 0.3

    const shifterUncovered = this.resource('shifter_uncovered.png')
    shifterUncovered.scale.x = shifterUncovered.scale.y = 0.6

    const shifterCovered = this.resource('shifter_covered.png')
    shifterCovered.scale.x = shifterCovered.scale.y = 0.6
    

    const clearDraw = new PIXI.Graphics()
    clearDraw.beginFill(0xffff00)
    clearDraw.drawCircle(0, 0, 200)
    //创建一个模糊滤镜
    // const blurFilter = new PIXI.filters.BlurFilter();
    // const blurFilter = new PIXI.Filter('BlurFilter', 20);

    //设置模糊滤镜的属性
    // blurFilter.blur = 20;
    clearDraw.endFill()
    // clearDraw.filters = [blurFilter]

    // clearDraw.pivot.x = clearDraw.pivot.y = clearDraw.width/2

    // const clearDraw = this.resource('shifter_clear.png')
    clearDraw.width = clearDraw.height = 200
    clearDraw.pivot.x = clearDraw.pivot.y = clearDraw.width/2


    shifterCovered.interactive = true
    shifterCovered.buttonMode = true
    shifterCovered.on('mousemove', (event) => {
      const { x, y } = event.data.global
      console.log(x, y);
      clearDraw.x = x
      clearDraw.y = y
      shifterUncovered.mask = clearDraw
      // shifterCovered.mask = clearDraw
      // event.backgroundAlpha = 0.2
    })

    shifterContainer.addChild(shifterSpokes)
    shifterContainer.addChild(shifterCovered)
    shifterContainer.addChild(shifterUncovered)
    shifterContainer.addChild(clearDraw)


    this.stage.addChild(shifterContainer)

    function resize() {
      // shifterBike.x = window.innerWidth - shifterBike.width
      // shifterBike.y = window.innerHeight - shifterBike.height
      // shifterContainer.x = window.innerWidth - shifterContainer.width
      // shifterContainer.y = window.innerHeight - shifterContainer.height

      // shifterCovered.x = window.innerWidth - shifterBike.width
      // shifterCovered.y = window.innerHeight - shifterBike.height - 600
      
    }
    window.addEventListener('resize', resize)
    resize()
  }
}