import { FC } from "react";
import {
  LoaderBody,
  UploadingMessage,
  UploadLaoderWrapper,
} from "./uploadLoader.styles";
import { Loader } from "../loader/loader.component";

const UploadLoader: FC = () => {
  return (
    <UploadLaoderWrapper>
      <LoaderBody>
        <UploadingMessage>사운드 업로드 중...</UploadingMessage>
        <Loader />
      </LoaderBody>
    </UploadLaoderWrapper>
  );
};

export { UploadLoader };
