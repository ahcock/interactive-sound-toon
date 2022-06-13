import styled from "styled-components";
import Switch from "/images/svg/switch.svg";

export const PluginBlockContainer = styled.div`
  padding: 3px;
  width: 100%;
  height: 20px;
  background-color: rgb(48, 48, 50);
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(130, 54, 58);
`;

export const OnOffButton = styled.button``;

export const SwitchIcon = styled(Switch)`
  width: 13px;
  height: 13px;
`;

export const PluginName = styled.div`
  width: 100%;
  color: rgb(82, 82, 84);
  text-align: start;
  cursor: pointer;
`;
