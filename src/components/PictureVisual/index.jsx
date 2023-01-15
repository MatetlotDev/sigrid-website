import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { TfiClose } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import { pictures } from '../../constants';
import {
  nextImg,
  prevImg,
  selectActualImg,
  selectOpen,
  setOpen,
} from './redux/PictureVisualSlice';

const BackgroundBlur = styled.section`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  z-index: 111;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  background: rgba(14, 14, 14, 0.75);
  backdrop-filter: blur(15px);
  padding: 50px;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  .close-icon,
  .prev-icon,
  .next-icon {
    position: absolute;
    font-size: 3rem;
    cursor: pointer;
  }
  .close-icon {
    top: 0;
    right: 0;
  }
  .prev-icon,
  .next-icon {
    top: 50%;
    transform: translateY(-50%);
  }
  .prev-icon {
    left: 0;
    ${({ disablePrev }) =>
      disablePrev &&
      `
      opacity: .5;
      pointer-events: none;
    `}
  }
  .next-icon {
    right: 0;
    ${({ disableNext }) =>
      disableNext &&
      `
      opacity: .5;
      pointer-events: none;
    `}
  }
  .contact-button {
    position: absolute;
    right: 1%;
    bottom: 3%;
  }
`;
const PictureWrapper = styled.div`
  span {
    font-family: 'Cormorant', serif;
    font-size: 1.2rem;
    color: white;
    display: block;
  }
  p {
    font-family: 'Cinzel', serif;
    font-size: 1.6rem;
    display: block;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  img {
    max-width: 70vw;
    max-height: 70vh;
  }
`;

function PictureVisual() {
  const dispatch = useDispatch();
  const open = useSelector(selectOpen);
  const actualImg = useSelector(selectActualImg);

  const isLastImg = actualImg && actualImg.id === pictures.length - 1;
  const isFirstImg = actualImg && actualImg.id === 0;

  const contactButtonClick = () => {
    // redirect to /contact with actualImg in params
  };

  return (
    <BackgroundBlur open={open}>
      <Wrapper disableNext={isLastImg} disablePrev={isFirstImg}>
        <TfiClose onClick={() => dispatch(setOpen(false))} className="close-icon" />
        <SlArrowRight
          onClick={() => !isLastImg && dispatch(nextImg())}
          className="next-icon"
        />
        <SlArrowLeft
          onClick={() => !isFirstImg && dispatch(prevImg())}
          className="prev-icon"
        />
        <PictureWrapper>
          {actualImg && (
            <img src={actualImg.path} alt="sigrig painting in bigger view" />
          )}
          {actualImg && actualImg.available && (
            <div className="flex">
              <div>
                <p>{actualImg.name}</p>
                <span>
                  {actualImg.dimensions} - {actualImg.available && 'Available'}
                </span>
                <span>{actualImg.price} NZ$</span>
              </div>
            </div>
          )}
        </PictureWrapper>
        <Button
          className="contact-button"
          label="contact"
          color="#FFF"
          outlined
          border
          size={1.2}
          onClick={contactButtonClick}
        />
      </Wrapper>
    </BackgroundBlur>
  );
}

export default PictureVisual;
