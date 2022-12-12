import { useContext, useState } from "react";
import { typesData } from "../../utils/data/types";
import { TerastalRefContext } from "../templates/RegisterPokemon";
import { hiraToKana } from "../../utils/hiraToKana";

type TerastalForm = {
  focusItem: () => void;
};

const TerastalForm = ({ focusItem }: TerastalForm) => {
  const { terastalRef } = useContext(TerastalRefContext);
  const [visibleTetalstalList, setVisibleTerastalList] =
    useState<boolean>(false);

  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [filterTerastalList, setFilterTerastalList] =
    useState<string[]>(typesData);

  const setTerastal = (value: string) => {
    if (terastalRef.current) {
      terastalRef.current.value =
        typesData.find((type) => type === value) !== undefined ? value : "";
    }
    setVisibleTerastalList(false);
  };

  const addTerastalList = (value: string) => {
    setSelectIndex(0);
    const list = typesData.filter(
      (type) => hiraToKana(type).indexOf(hiraToKana(value)) === 0
    );

    if (list.length === 0) {
      setFilterTerastalList(typesData);
      return;
    }

    setFilterTerastalList(list);
  };

  // やじるしでスクロール
  const keyDown = (e) => {
    if (e.key === "Enter") {
      setTerastal(filterTerastalList[selectIndex]);
      focusItem();
    }
    if (e.key === "ArrowDown") {
      if (filterTerastalList.length - 1 > selectIndex) {
        setSelectIndex((selectIndex) => selectIndex + 1);
        console.log(selectIndex);
      }
    }
    if (e.key === "ArrowUp") {
      if (selectIndex > 0) {
        setSelectIndex((selectIndex) => selectIndex - 1);
      }
    }
  };
  return (
    <div
      onBlur={(e) => {
        setTimeout(() => setTerastal(terastalRef.current?.value.trim()), 300);
      }}>
      <input
        ref={terastalRef}
        onFocus={() => {
          setVisibleTerastalList(true), setFilterTerastalList(typesData);
        }}
        onChange={(e) => addTerastalList(e.target.value)}
        placeholder="テラスタル"
        autoComplete="off"
        onKeyDown={(e) => keyDown(e)}
        style={{
          padding: 0,
          fontSize: "10px",
          height: 16,
          width: "90%",
          background: "#e0e8e8",
          border: "none",
          position: "relative",
          top: -6,
          left: "85%",
        }}
      />
      {visibleTetalstalList && (
        <ul
          style={{
            paddingLeft: 0,
            maxHeight: 240,
            overflow: "auto",
            borderRadius: 5,
            background: "white",
            width: "95%",
            position: "relative",
            zIndex: 1,
            top: -25,
            left: "85%",
          }}>
          {filterTerastalList.map((type, index) => (
            <li
              key={type}
              onClick={() => {
                setTerastal(type), focusItem();
              }}
              style={{
                listStyle: "none",
                padding: 3,
                background: `${index === selectIndex ? "lightgrey" : "white"}`,
              }}>
              {type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TerastalForm;
