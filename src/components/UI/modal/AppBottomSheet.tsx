import React, {useMemo, useRef} from 'react';

import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

type BottomSheetProps = {
  children?: React.ReactNode;
  isActive: boolean;
  setIsActive: (arg: boolean) => void;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
};

const AppBottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({children, isActive, setIsActive}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    bottomSheetRef.current?.close();
    const snapPoints = useMemo(() => ['50%'], []);

    useMemo(() => {
      isActive === true
        ? bottomSheetRef.current?.snapToIndex(0)
        : bottomSheetRef.current?.close();
    }, [isActive]);
    return (
      <>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => {
            setIsActive(false);
          }}>
          <BottomSheetView>{children}</BottomSheetView>
        </BottomSheet>
      </>
    );
  },
);

export default AppBottomSheet;
