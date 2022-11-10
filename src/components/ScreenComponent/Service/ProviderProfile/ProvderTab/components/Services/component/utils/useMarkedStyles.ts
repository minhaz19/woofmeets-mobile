import {useMemo, useState} from 'react';
import Colors from '../../../../../../../../../constants/Colors';

export const useMarkedStyles = (availabileDates: any) => {
  const [_markedStyle, setMarkedStyle] = useState({});
  useMemo(() => {
    console.log('memo');
    let styledMarkedRange: any = {};
    const styledRange = availabileDates?.map((_: string, i: number) => ({
      [availabileDates[i]]: {
        customStyles: {
          container: {
            backgroundColor: Colors.primary,
            elevation: 2,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: 'white',
          },
        },
      },
    }));

    styledRange?.map(
      (item: any) =>
        // @ts-ignore
        (styledMarkedRange[Object.keys(item)] = Object.values(item)[0]),
    );
    setMarkedStyle(styledMarkedRange);
  }, [availabileDates]);
  return {_markedStyle};
};
