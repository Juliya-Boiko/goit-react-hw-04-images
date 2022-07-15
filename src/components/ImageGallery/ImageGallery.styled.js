import styled from "styled-components";

export const ImageGalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const ImageGalleryListItem = styled.li`
  margin: 10px;
  width: calc((100vw - 80px) / 4);
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;