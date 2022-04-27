import styled from "styled-components";

export const SoundLayerSection = styled.section<{
  width: number;
  height: number;
  show?: boolean;
}>`
  position: absolute;
  top: 0;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(200, 1fr);
`;

export const StickyAudioPlayerContainer = styled.article`
  position: sticky;
  bottom: 0;
  left: 50%;
  width: max-content;
  height: 100px;
`;

export const SoundContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: aliceblue;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StyledAudio = styled.audio`
  visibility: hidden;
  //&::-webkit-media-controls-panel {
  //  background-color: #56aeff;
  //}
  //
  //&::-webkit-media-controls-mute-button,
  //::-webkit-media-controls-play-button,
  //::-webkit-media-controls-timeline-container,
  //::-webkit-media-controls-current-time-display,
  //::-webkit-media-controls-time-remaining-display,
  //::-webkit-media-controls-timeline {
  //  display: none;
  //}
`;
