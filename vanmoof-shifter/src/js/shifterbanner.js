class ShifterBanner {
  constructor(selector) {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x123456,
      resizeTo: window
    })

    document.querySelector(selector).appendChild(this.app.view)
  }
}