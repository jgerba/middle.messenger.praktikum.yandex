import { PropsType } from '../core/types.ts';

export default function getDataToUpdate(
  leftArr: PropsType[],
  rightArr: PropsType[],
): PropsType[] | [] {
  const resultArr: PropsType[] = [];

  leftArr.forEach((leftArrChat) => {
    const hasData = rightArr?.find(
      (rightArrChat) => rightArrChat.id === leftArrChat.id,
    );

    if (!hasData) {
      resultArr.push(leftArrChat);
    }
  });

  return resultArr;
}
