import { FC, useEffect, useState } from "react";
import { SoundLayerSection } from "./soundLayer.styles";
import { SoundGridForCreator } from "../soundGridForCreator/soundGridForCreator.component";

interface SoundLayerProps {
  imageLayerDimension: {
    height: number;
    width: number;
  };
}

const SoundLayer: FC<SoundLayerProps> = ({
  imageLayerDimension: { height, width },
}) => {
  const [soundGridItems, setSoundGridItems] = useState<Element[] | undefined>();

  useEffect(function registerSoundGrid() {
    const soundGrids = [];
    for (let i = 1; i < 201; i++) {
      for (let j = 1; j < 11; j++) {
        soundGrids.push(
          <SoundGridForCreator
            gridPosition={{ row: `${i} / ${i + 1}`, column: `${j} / ${j + 1}` }}
            showGrid
          />
          // <SoundNode
          //   key={`column${i} row${j}`}
          //   gridPosition={{ column: i / i + 1, row: j / j + 1 }}
          //   data-column={`${j} / ${j + 1}`}
          //   data-row={`${i} / ${i + 1}`}
          //   onClick={(e) => {
          //     const position = {
          //       column: e.currentTarget.getAttribute("data-column"),
          //       row: e.currentTarget.getAttribute("data-row"),
          //     };
          //     predefinedSoundNodes.push(position);
          //   }}
          // />
        );
      }
    }

    setSoundGridItems(soundGrids);
  }, []);

  return (
    <SoundLayerSection height={height} width={width} show>
      {soundGridItems}
    </SoundLayerSection>
  );
};

export { SoundLayer };
