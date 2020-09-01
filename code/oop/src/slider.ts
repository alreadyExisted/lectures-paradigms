export interface SliderOptions {
  selector: string
  theme?: 'rectangle' | 'ellipse'
  slidesCount?: number
  slidesToShow?: number
  gap?: number
  aspectRatio?: number
}

const DEFAULT_OPTIONS = { theme: 'rectangle', slidesCount: 7, slidesToShow: 1, gap: 15, aspectRatio: 9/21 } as const

export class Slider {
  protected sliderEl: HTMLElement
  protected containerEl: HTMLElement
  protected itemsWrapperEl: HTMLElement
  protected options: Required<SliderOptions>
  protected activeIndex: number = 0
  protected prevButton: HTMLButtonElement
  protected nextButton: HTMLButtonElement

  constructor(options: SliderOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options }

    this.initWrappers()
    this.initSlides()
    this.initButtons()
    this.setSliderStyles()
    
    window.addEventListener('resize', () => this.setSliderStyles())
  }

  prevSlide = () => {
    if (this.activeIndex > 0) {
      this.activeIndex -= 1
      this.setSliderStyles()
    }
  }

  nextSlide = () => {
    if (this.activeIndex < this.options.slidesCount - 1) {
      this.activeIndex += 1
      this.setSliderStyles()
    }
  }

  protected initWrappers() {
    const root = document.querySelector(this.options.selector)

    if (!root) throw Error('It is disaster')

    this.sliderEl = this.createElement('div', 'slider slider--rectangle')
    
    this.containerEl = this.createElement('div', 'slider__container')
    this.itemsWrapperEl = this.createElement('div', 'slider__items')
    this.containerEl.appendChild(this.itemsWrapperEl)
    this.sliderEl.appendChild(this.containerEl)
    root.appendChild(this.sliderEl)
  }

  protected setSliderStyles() {
    this.setContainerStyles()
    this.setItemsWrapperStyles()
    this.setButtonsStyles()
  }

  protected setContainerStyles() {
    const width = this.getSlideWidthWithGaps()
    const { aspectRatio } = this.options
    this.containerEl.style.height = `${width * aspectRatio}px`
  }

  protected setItemsWrapperStyles() {
    const { slidesCount } = this.options
    const width = this.getSlideWidthWithGaps()
    this.itemsWrapperEl.style.width = `${slidesCount * width}px`
    this.itemsWrapperEl.style.transform = `translateX(${-(width * this.activeIndex)}px)`
  }

  protected initSlides() {
    const { slidesCount } = this.options
    for (let i = 0; i < slidesCount; i++) {
      const slide = this.createElement('div', 'slider__item')
      slide.style.background = this.getRandomColor()
      this.setSlideSizes(slide)
      this.itemsWrapperEl.appendChild(slide)
    }
  }

  protected setSlideSizes(slide: HTMLElement) {
    const { gap, aspectRatio } = this.options
    const width = this.getSlideWidthWithGaps()
    slide.style.width = `${width - 2 * gap}px`
    slide.style.height = `${width * aspectRatio}px`
    slide.style.marginLeft = `${gap}px`
    slide.style.marginRight = `${gap}px`
  }

  protected initButtons() {
    const buttonsContainer = this.createElement('div', 'slider__buttons')
    this.prevButton = this.createElement('button', 'slider__button', 'PREV') as HTMLButtonElement
    this.prevButton.addEventListener('click', this.prevSlide)
    buttonsContainer.appendChild(this.prevButton)

    this.nextButton = this.createElement('button', 'slider__button', 'NEXT') as HTMLButtonElement
    this.nextButton.addEventListener('click', this.nextSlide)
    buttonsContainer.appendChild(this.nextButton)

    this.sliderEl.appendChild(buttonsContainer)
  }

  protected setButtonsStyles() {
    this.prevButton.disabled = this.activeIndex === 0
    this.nextButton.disabled = this.activeIndex === this.options.slidesCount - 1
  }

  protected getSlideWidthWithGaps() {
    const { width } = this.sliderEl.getBoundingClientRect()
    const { slidesToShow } = this.options
    return width / slidesToShow
  }

  private createElement(tag: string, className?: string, text?: string) {
    const element  = document.createElement(tag)
    if (className) element.className = className
    if (text) element.innerText = text
    return element
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
}
