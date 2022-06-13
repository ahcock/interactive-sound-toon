import { FC } from "react";
import { SoundMixerContainer } from "./soundMixer.styles";
import { ChannelStrip } from "../channelStrip/channelStrip.component";

const SoundMixer: FC = () => {
  return (
    <SoundMixerContainer>
      <ChannelStrip />
      <ChannelStrip />
      <ChannelStrip />
      <ChannelStrip />
    </SoundMixerContainer>
  );
};

export { SoundMixer };
