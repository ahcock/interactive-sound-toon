import { FC, useEffect, useRef, useState } from "react";
import { PageContainer } from "./samplePageIndex.styles";
import { SoundLayer } from "../../components/soundLayer/soundLayer.component";
import ImageLayer from "../../components/imageLayer/imageLayer.component";

interface SampleImageType {
  src: string;
}

interface TotalImageDimensionType {
  width: number;
  height: number;
}

// {/*TODO 일반 유저일 때: 이 SoundLayer안에서 오디오 플레이 노드가 그리드 포지션에 맞게 배치만 되면 됨*/}
// {/*TODO 크리에이터 일 떄: SoundLayer에서 셋팅된 grid 개수 만큼 <오디오 업로드> 콤포넌트를 배치를 해야 함  */}
// {/*TODO hover시 + 사인이 뜨는 input + label 콤포넌트를 만들고, onChange event시에는, 바로 서버에 업로드가 되고, <오디오 업로드> 콤포넌트 내의  */}
// {/*TODO statde 토글로 인해, UI를 더이상 +모양의 인풋 콤포넌트가 "아닌", 커스터마이징 된 오디오 플레이어를 보여준다(재생, 정지,볼륨 기능 탑재한) UI 오른쪽 윗쪽에  */}
// {/*TOD 엑스버튼을 두어 그것을 누르면 서버에서 삭제가 되는 로직을 만들어야 겠다 */}

const Sample: FC = () => {
  const [imageList, setImageList] = useState<SampleImageType[]>([]);
  const [imageLayerDimension, setImageLayerDimension] =
    useState<TotalImageDimensionType>({ width: 0, height: 0 });

  const imagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(function fetchSampleImages() {
    fetch("/data/sampleImages.json")
      .then((res) => res.json())
      .then((images) => setImageList(images));
  }, []);

  useEffect(
    function getImageContainerDimension() {
      const container = imagesContainerRef.current;
      if (container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        setImageLayerDimension({ width, height });
      }
    },
    [imageList]
  );

  return imageList.length === 0 ? (
    <p>Loading Images</p>
  ) : (
    <PageContainer>
      <ImageLayer imageList={imageList} ref={imagesContainerRef} />
      <SoundLayer imageLayerDimension={imageLayerDimension} />
    </PageContainer>
  );
};

const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default Sample;
export type { SampleImageType };
