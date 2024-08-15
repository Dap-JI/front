import styled from 'styled-components';
import Slider from 'react-slick';

export const StyledSlider = styled(Slider).attrs({
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerMode: true,
  centerPadding: '0px',
  draggable: true,
})`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    padding: 0 15px;
  }

  .slick-center {
    opacity: 1 !important;
  }

  .slick-track {
    display: flex;
    justify-content: center;
  }
`;
