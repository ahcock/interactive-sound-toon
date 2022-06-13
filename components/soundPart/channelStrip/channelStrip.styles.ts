import styled from "styled-components";

export const ChannelStripContainer = styled.div`
  width: 100px;
  height: 100%;
  background-color: var(--primary-channel-strip);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3px;
`;

export const ChannelStripTitle = styled.h5`
  color: rgb(255, 255, 255);
  margin: 5px 0;
`;
