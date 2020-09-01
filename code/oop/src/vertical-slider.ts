import { SliderOptions, Slider } from './slider'

export class VerticalSlider extends Slider {
  constructor(options: SliderOptions) {
    super(options)
    this.sliderEl.classList.add('slider--vertical')
  }

  protected setContainerStyles() {
    const { width } = this.sliderEl.getBoundingClientRect()
    const { aspectRatio } = this.options
    this.containerEl.style.height = `${width * aspectRatio}px`
  }

  protected setItemsWrapperStyles() {
    const { slidesCount } = this.options
    const height = this.getSlideHeightWithGaps()
    this.itemsWrapperEl.style.height = `${slidesCount * height}`
    this.itemsWrapperEl.style.transform = `translateY(${-(height * this.activeIndex)}px)`
  }

  protected setSlideSizes(slide: HTMLElement) {
    const { width } = this.sliderEl.getBoundingClientRect()
    const { gap } = this.options
    slide.style.width = `${width}px`
    slide.style.height = `${this.getSlideHeightWithGaps() - 2 * gap}px`
    slide.style.marginTop = `${gap}px`
    slide.style.marginBottom = `${gap}px`
  }

  private getSlideHeightWithGaps() {
    const { width } = this.sliderEl.getBoundingClientRect()
    const { slidesToShow, aspectRatio } = this.options
    return (width * aspectRatio) / slidesToShow
  }
}
