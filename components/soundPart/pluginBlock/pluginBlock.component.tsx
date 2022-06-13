import { FC } from "react";
import {
  OnOffButton,
  PluginBlockContainer,
  PluginName,
  SwitchIcon,
} from "./pluginBlock.styles";
import Switch from "/images/svg/switch.svg";

enum PluginType {
  EQ = "EQ",
  DELAY = "Delay",
  REVERB = "Reverb",
}

interface IPluginBlockProps {
  type: PluginType;
}

const PluginBlock: FC<IPluginBlockProps> = ({ type }) => {
  return (
    <PluginBlockContainer>
      <OnOffButton role="switch">
        <SwitchIcon fill="rgb(82,82,84)" />
      </OnOffButton>

      <PluginName>
        <span>{type}</span>
      </PluginName>
    </PluginBlockContainer>
  );
};

export { PluginBlock, PluginType };
export type { IPluginBlockProps };
