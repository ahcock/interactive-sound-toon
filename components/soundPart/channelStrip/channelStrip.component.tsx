import { FC } from "react";
import {
  ChannelStripContainer,
  ChannelStripTitle,
} from "./channelStrip.styles";
import { PluginBlock, PluginType } from "../pluginBlock/pluginBlock.component";

const ChannelStrip: FC = () => {
  return (
    <ChannelStripContainer>
      <ChannelStripTitle>soundName</ChannelStripTitle>
      <PluginBlock type={PluginType.EQ} />
      <PluginBlock type={PluginType.DELAY} />
      <PluginBlock type={PluginType.REVERB} />
    </ChannelStripContainer>
  );
};

export { ChannelStrip };
