import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { TfiClose } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import Button from '../../components/Button';
import {
  nextImg,
  prevImg,
  selectActualImg,
  selectOpen,
  setImg,
} from '../../store/globalSlice';
import ProgressiveImg from '../ProgressiveImg';

const Section = styled.section`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  padding: 50px;
  z-index: 111;
  color: white;

  & > * {
    z-index: 11111;
  }

  .icon,
  .icon,
  .icon {
    position: absolute;
    font-size: 3rem;
    cursor: pointer;
    padding: 50px;
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
  }
  .next-icon {
    right: 0;
  }
  .contact-button {
    position: absolute;
    right: 1%;
    bottom: 0%;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    .contact-button {
      right: 50%;
      transform: translateX(50%);
    }
    .next-icon,
    .prev-icon {
      display: none;
    }
  }
`;
const Backdrop = styled.div`
  z-index: 1111;
  position: absolute;
  backdrop-filter: blur(15px);
  background: rgba(14, 14, 14, 0.75);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const PictureWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
    position: relative;

    .absolute {
      position: absolute;
      bottom: 30px;
      left: -50px;
      transform: translateX(-100%);
    }
  }
  img {
    max-width: 70vw;
    max-height: 100vh;
  }

  @media ${({ theme }) => theme.sizes.tabletS} {
    img {
      max-width: 95vmin;
      max-height: 95vmin;
    }
  }
`;

function PictureVisual() {
  const dispatch = useDispatch();
  const open = useSelector(selectOpen);
  const actualImg = useSelector(selectActualImg);

  return (
    <Section open={open}>
      <Backdrop onClick={() => dispatch(setImg(null))} />
      <div className="icon close-icon">
        <TfiClose onClick={() => dispatch(setImg(null))} />
      </div>
      <div className="icon next-icon">
        <SlArrowRight onClick={() => dispatch(nextImg())} />
      </div>
      <div className="icon prev-icon">
        <SlArrowLeft onClick={() => dispatch(prevImg())} />
      </div>
      <PictureWrapper>
        {actualImg && (
          <>
            <ProgressiveImg
              src={actualImg.path}
              alt="sigrig painting in bigger view"
            />
            <div className="flex">
              <div className="absolute">
                <p>{actualImg?.name}</p>
                <span>{actualImg.dimensions}</span>
              </div>
            </div>
          </>
        )}
      </PictureWrapper>
    </Section>
  );
}

export default PictureVisual;
