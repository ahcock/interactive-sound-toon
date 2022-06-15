import { FC } from "react";
import { SoundMixerContainer } from "./soundMixer.styles";
import { ChannelStrip } from "../channelStrip/channelStrip.component";
import { Knob } from "../Knob/knob.component";
import { PluginEQ } from "../pluginEQ/pluginEQ.component";

const SoundMixer: FC = () => {
  return (
    <SoundMixerContainer>
      <ChannelStrip />
      <ChannelStrip />
      <ChannelStrip />
      <ChannelStrip />
      <PluginEQ />
    </SoundMixerContainer>
  );
};

export { SoundMixer };
