import { FC } from "react";
import {
  ConsentModalButtonContainer,
  ModalBackground,
  ModalContainer,
  PlaybackConsentQuestion,
} from "./consentModal.styles";
import { JSButton } from "../../reusable/JSButton/JSButton.component";
import { AudioPlayConsentHandler } from "../soundLayer/soundLayer.component";

interface IConsentModalProps {
  audioPlayConsentHandler: AudioPlayConsentHandler;
  isRegisteringSound: boolean;
}

const ConsentModal: FC<IConsentModalProps> = ({
  audioPlayConsentHandler,
  isRegisteringSound,
}) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <PlaybackConsentQuestion>
          본 웹툰은 사운드를 포함하고 있습니다. <br />
          사운드를 재생하시겠습니까?
        </PlaybackConsentQuestion>
        <ConsentModalButtonContainer>
          <JSButton
            onClick={() => audioPlayConsentHandler(true)}
            disabled={isRegisteringSound}
          >
            {isRegisteringSound ? "사운드 로딩 중..." : "사운드 재생"}
          </JSButton>
          <JSButton onClick={() => audioPlayConsentHandler(false)}>
            사운드 없이 보기
          </JSButton>
        </ConsentModalButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export { ConsentModal };
