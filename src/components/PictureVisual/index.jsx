import { GrNext, GrPrevious } from 'react-icons/gr';
import { TfiClose } from 'react-icons/tfi';
import styled from 'styled-components';
import Button from '../../components/Button';

const BackgroundBlur = styled.section``;
const Wrapper = styled.div``;
const PictureWrapper = styled.div``;

function PictureVisual({ open, actualImg }) {
  return (
    <BackgroundBlur open={open}>
      <Wrapper>
        <TfiClose />
        <GrNext />
        <GrPrevious />
        <PictureWrapper>
          {actualImg && actualImg.available && (
            <span>{actualImg.available && 'Available'}</span>
          )}
          {actualImg && (
            <img src={actualImg.path} alt="sigrig painting in bigger view" />
          )}
          <div>
            <p>{actualImg.name && actualImg.name}</p>
            <Button label="contact" outlined size={1.35} />
          </div>
          {actualImg.available && <span>{actualImg.dimensions}</span>}
          {actualImg.available && <span>{actualImg.price} NZ$</span>}
        </PictureWrapper>
      </Wrapper>
    </BackgroundBlur>
  );
}

export default PictureVisual;
