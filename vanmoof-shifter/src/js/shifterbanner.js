class ShifterBanner {
  constructor(selector) {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      antialias: true,
      resizeTo: window
    })

    document.querySelector(selector).appendChild(this.app.view)

    this.stage = this.app.stage

    this.loader = new PIXI.Loader();
    this.loader.add('btn.png', './images/btn.png')
    this.loader.add('btn_circle.png', './images/btn_circle.png')
    this.loader.add('shifter_bike.jpg', './images/shifter_bike.jpg')
    this.loader.add('shifter_spokes.png', './images/shifter_spokes.png')
    this.loader.add('shifter_uncovered.png', './images/shifter_uncovered.png')
    this.loader.add('shifter_covered.png', './images/shifter_covered.png')
    this.loader.add('shifter_clear.png', './images/shifter_clear.png')
    this.loader.add('shifter_bike.png', './images/shifter_bike.png')
    this.loader.add('shifter_wheel.png', './images/shifter_wheel.png')


    this.loader.load()
    this.loader.onComplete.add(() => {
      this.show()
    })
  }

  resource (name) {
    return new PIXI.Sprite(this.loader.resources[name].texture)
  }

  createBtn () {
    const btnContainer = new PIXI.Container()
    // const btnImage = this.resource('btn.png')
    // const btnCircleImage = this.resource('btn_circle.png')

    // btnImage.pivot.x = btnImage.pivot.y = btnImage.width / 2
    // btnCircleImage.pivot.x = btnCircleImage.pivot.y = btnCircleImage.width / 2
    // btnContainer.addChild(btnImage)
    // btnContainer.addChild(btnCircleImage)

    const btnCircle = new PIXI.Graphics()
    btnCircle.beginFill(0xffe720)
    btnCircle.drawCircle(0, 0, 60)
    btnCircle.endFill()
    btnContainer.addChild(btnCircle)


    const btnCircleEdge = new PIXI.Graphics()
    btnCircleEdge.lineStyle(2, 0xffe720)
    btnCircleEdge.drawCircle(0, 0, 76)
    btnCircleEdge.endFill()
    btnContainer.addChild(btnCircleEdge)

    const btnCircleEdge2 = new PIXI.Graphics()
    btnCircleEdge2.lineStyle(2, 0xffe720)
    btnCircleEdge2.drawCircle(0, 0, 76)
    btnCircleEdge2.endFill()
    btnCircleEdge2.scale.x = btnCircleEdge2.scale.y = 0.8
    btnCircleEdge2.alpha = 0
    btnContainer.addChild(btnCircleEdge2)


    const btnText = new PIXI.Text('click & hold', {
      width: 80,
      fontSize: 28,
      wordWrap: true
    })
    btnText.anchor.x = 0
    btnText.anchor.y = 0
    btnText.x = -36
    btnText.y = -30

    btnText.pivot.x = btnText.pivot.y = 0
    btnContainer.addChild(btnText)

    gsap.to(btnCircle.scale, {x: 0.8, y: 0.8, duration: 0.3, repeat: -1, repeatDelay: 2})
    gsap.to(btnCircleEdge2, {alpha: 1, duration: 0.3, repeat: -1, repeatDelay: 2})

    gsap.to(btnCircle.scale, {x: 1, y: 1, duration: 0.3, repeat: -1, repeatDelay: 2, delay: 0.3})

    gsap.to(btnCircleEdge2.scale, {x: 1.2, y: 1.2, duration: 0.6, repeat: -1, repeatDelay: 2, delay: 0.3})
    gsap.to(btnCircleEdge2, {alpha: 0, duration: 0.6, repeat: -1, repeatDelay: 2, delay: 0.3})


    return btnContainer

  }

  createWholeBike () {
    const wholeContainer = new PIXI.Container()
    const shifterBike = this.resource('shifter_bike.png')
    const shifterWheel = this.resource('shifter_wheel.png')

    wholeContainer.addChild(shifterWheel)
    wholeContainer.addChild(shifterBike)
    // shifterBike.scale.x = shifterBike.scale.y = 0.6
    // shifterWheel.scale.x = shifterWheel.scale.y = 0.6


    // shifterWheel.x = window.innerWidth - shifterWheel.width
    // shifterWheel.y = window.innerHeight - shifterWheel.height
    // shifterBike.x = shifterWheel.x = shifterWheel.width/2
    // shifterBike.y = shifterWheel.y

    // shifterBike.x = 0

    wholeContainer.x = window.innerWidth - shifterWheel.width / 2

    wholeContainer.y = window.innerHeight - shifterWheel.height



    return wholeContainer
  }

  show () {
    const shifterContainer = new PIXI.Container()
    this.stage.addChild(shifterContainer)

    const shifterSpokes = this.resource('shifter_spokes.png')
    shifterSpokes.scale.x = shifterSpokes.scale.y = 0.6
    shifterSpokes.alpha = 0.3

    // const shifterSpokes2 = this.resource('shifter_spokes.png')
    // shifterSpokes2.scale.x = shifterSpokes2.scale.y = 0.6
    // shifterSpokes2.alpha = 0.3
    // shifterContainer.addChild(shifterSpokes2)


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


    shifterContainer.addChild(shifterSpokes)


    const maskDraw = new PIXI.Graphics()
    maskDraw.beginFill(0xffffff, 1)
    maskDraw.drawRect(0, 0, shifterCovered.width, shifterCovered.height)
    maskDraw.endFill()
    
    // shifterContainer.addChild(maskDraw)
    shifterContainer.addChild(shifterCovered)
   

    shifterContainer.addChild(shifterUncovered)

    // shifterContainer.addChild(shifterSpokes2)

    // shifterContainer.addChild(clearDraw)

    

    // mask 遮罩层
    const radius = 200;

    // The blur amount
    const blurSize = 32;
    const circle = new PIXI.Graphics()
      .beginFill(0xFF0000)
      .drawCircle(radius + blurSize, radius + blurSize, radius)
      .endFill();
    circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

    const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = this.app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
    const focus = new PIXI.Sprite(texture);

    // this.stage.addChild(focus);
    shifterContainer.addChild(focus);
    shifterUncovered.mask = focus;
    // maskDraw.mask = focus;



    this.stage.interactive = true;
    this.stage.on('mousemove', pointerMove);

    function pointerMove (event) {
      focus.position.x = event.data.global.x - focus.width / 2;
      focus.position.y = event.data.global.y - focus.height / 2;
      // focus.blendMode = PIXI.BLEND_MODES['SRC_IN']

    }

    const btnContainer = this.createBtn()
    btnContainer.x = btnContainer.y = 400
    shifterContainer.addChild(btnContainer)
    


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