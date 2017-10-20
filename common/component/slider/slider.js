/**
 * 轮播组件
 */
import React from 'react'
import Slider from 'react-slick'
import './slider.scss'

const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  autoplay: true,
  arrows: false,
  lazyLoad: true
}

const Slide = ({ data }) => (
  <div className='slideDiv'>
    <Slider {...settings} ref={c => this.slider = c} >
      {
        data.map((item, index) =>
          <a href={item.extra && item.extra.innerurl ? item.extra.innerurl : null} target='_blank' rel="noopener" key={index}>
            <img src={item.imgurl} style={{ width: '100%' }} />
          </a>
        )
      }
    </Slider>
  </div>
)

export default Slide