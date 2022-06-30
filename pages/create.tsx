import { FC } from "react";
import { GetServerSideProps } from "next";

const Create: FC = () => {
  return <div>크리에이트 페이지</div>;
};

//TODO: isPagePrivate props에 자동완성 시킬수는 없을까? type을 어디다 지정해두어야 될까?
const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      isPagePrivate: true,
    },
  };
};

export default Create;
export { getServerSideProps };
