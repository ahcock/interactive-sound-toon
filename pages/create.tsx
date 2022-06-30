import { FC } from "react";
import { CustomGetServerSideProps } from "./_app";

const Create: FC = () => {
  return <div>크리에이트 페이지</div>;
};

//TODO: isPagePrivate props에 자동완성 시킬수는 없을까? type을 어디다 지정해두어야 될까?
const getServerSideProps: CustomGetServerSideProps = async () => {
  return {
    props: {
      isPagePrivate: true,
    },
  };
};

export default Create;
export { getServerSideProps };
