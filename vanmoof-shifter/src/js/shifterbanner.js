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

    const shifterSpokes = this.resource('shifter_spokes.png')
    shifterSpokes.scale.x = shifterSpokes.scale.y = 0.6
    shifterSpokes.alpha = 0.3

    // const shifterSpokes2 = this.resource('shifter_spokes.png')
    // shifterSpokes2.scale.x = shifterSpokes2.scale.y = 0.6


    const shifterUncovered = this.resource('shifter_uncovered.png')
    shifterUncovered.scale.x = shifterUncovered.scale.y = 0.6

    const shifterCovered = this.resource('shifter_covered.png')
    shifterCovered.scale.x = shifterCovered.scale.y = 0.6
    shifterUncovered.backgroundAlpha = false

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
    clearDraw.pivot.x = clearDraw.pivot.y = clearDraw.width / 2

    const maskDraw = new PIXI.Graphics()
    maskDraw.beginFill(0xffffff, 1)
    console.log(shifterContainer.width, shifterContainer.height, this.app.view.width);
    const {width: maskX, height: maskY} = this.app.view
    maskDraw.drawRect(0, 0,maskX, maskY)
    maskDraw.endFill()


    // shifterSpokes2.mask = clearDraw
    maskDraw.mask = clearDraw
    shifterUncovered.mask = clearDraw
    // shifterSpokes.mask = clearDraw


    shifterContainer.addChild(shifterSpokes)

    shifterContainer.addChild(maskDraw)
    shifterContainer.addChild(shifterCovered)

    shifterContainer.addChild(shifterUncovered)
    // shifterContainer.addChild(shifterSpokes2)


    shifterContainer.addChild(clearDraw)

    this.stage.addChild(shifterContainer)

    console.log(maskX, maskY, this,maskDraw.wdith);

    shifterUncovered.interactive = true
    shifterUncovered.buttonMode = true
    shifterUncovered.on('mousemove', (event) => {
      const { x, y } = event.data.global
      // console.log(x, y);
      clearDraw.x = x
      clearDraw.y = y
      // uncoverFill.alpha=0
      // clearDraw.mask = shifterUncovered
      // shifterSpokes.mask = clearDraw
      // mask is  to alpha=0 where is mask.

      // fillDraw.mask = clearDraw
      // shifterCovered.mask = clearDraw
      // event.backgroundAlpha = 0.2
      // shifterContainer.mask = clearDraw
    })


    function resize () {
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