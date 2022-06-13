import { FC } from "react";
import { SoundMixerContainer } from "./soundMixer.styles";
import { ChannelStrip } from "../channelStrip/channelStrip.component";
import { Knob } from "../Knob/knob.component";

const SoundMixer: FC = () => {
  return (
    <SoundMixerContainer>
      <ChannelStrip />
      <ChannelStrip />
      <ChannelStrip />
      <ChannelStrip />

      <Knob />
    </SoundMixerContainer>
  );
};

export { SoundMixer };
