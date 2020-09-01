import './styles.css'
import { Slider } from './slider'
import { VerticalSlider } from './vertical-slider'

new Slider({
  selector: '#root',
  slidesToShow: 3,
  aspectRatio: 5/4
})

new VerticalSlider({
  selector: '#root',
  slidesToShow: 3
})