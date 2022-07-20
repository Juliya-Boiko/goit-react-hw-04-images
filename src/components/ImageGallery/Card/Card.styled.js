import styled from 'styled-components';

export const CardImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  :hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
