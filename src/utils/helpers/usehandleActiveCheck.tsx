import {useState} from 'react';

export const useHandleTempCheck = () => {
  const [active0, setActive0] = useState<any | {}>({});
  const [active1, setActive1] = useState<any | {}>({});
  const [active2, setActive2] = useState<any | {}>({});
  const [active3, setActive3] = useState<any | {}>({});
  const [active4, setActive4] = useState<any | {}>({});
  const [active5, setActive5] = useState<any | {}>({});
  const [active6, setActive6] = useState<any | {}>({});
  const [active7, setActive7] = useState<any | {}>({});
  const [active8, setActive8] = useState<any | {}>({});
  const [active9, setActive9] = useState<any | {}>({});
  const [active10, setActive10] = useState<any | {}>({});
  const [active11, setActive11] = useState<any | {}>({});
  const [active12, setActive12] = useState<any | {}>({});
  const handleActiveCheck = (parentId: number, key: number) => {
    parentId === 100 && setActive0({[key]: true});
    parentId === 101 && setActive1({[key]: true});
    parentId === 102 && setActive2({[key]: true});
    parentId === 103 && setActive3({[key]: true});
    parentId === 104 && setActive4({[key]: true});
    parentId === 105 && setActive5({[key]: true});
    parentId === 106 && setActive6({[key]: true});
    parentId === 107 && setActive7({[key]: true});
    parentId === 108 && setActive8({[key]: true});
    parentId === 109 && setActive9({[key]: true});
    parentId === 110 && setActive10({[key]: true});
    parentId === 111 && setActive11({[key]: true});
    parentId === 112 && setActive12({[key]: true});
  };

  return {
    active0,
    active1,
    active2,
    active3,
    active4,
    active5,
    active6,
    active7,
    active8,
    active9,
    active10,
    active11,
    active12,
    handleActiveCheck,
  };
};
export default useHandleTempCheck;
