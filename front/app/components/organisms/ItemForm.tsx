import React, { RefObject } from "react";
import { MutableRefObject, useContext, useEffect, useState } from "react";
import itemsData from "../../json/items.json";
import { getItemIcon } from "../../utils/getItemIcon";
import { hiraToKana } from "../../utils/hiraToKana";
type Props = {
  itemIcon?: string[];
  setItemIcon?: React.Dispatch<React.SetStateAction<string[]>>;
  currentPoke?: number;
  style: {
    input: {
      [key: string]: string | number;
    };
  };
};

type ItemRef = RefObject<HTMLInputElement>;

const ItemForm = React.forwardRef((props: Props, ref: ItemRef) => {
  const { style, setItemIcon, currentPoke, itemIcon } = props;
  const [filterItemList, setFilterItemList] = useState<string[]>([]);
  const [visibleItemList, setVisibleItemList] = useState<boolean>(false);
  const [selectIndex, setSelectIndex] = useState<number>(-1);

  useEffect(() => {
    if (filterItemList.length !== 0 && filterItemList[0] !== "not found") {
      setSelectIndex(0);
    } else {
      setSelectIndex(-1);
    }
  }, [filterItemList]);

  const changeItemForm = (value: string) => {
    ref.current.value =
      Object.keys(itemsData).find((item) => item === value) !== undefined
        ? value
        : "";
    if (itemIcon !== undefined) {
      const copyOfItemIcon = [...itemIcon];
      const iconUrl = getItemIcon(ref.current.value);
      copyOfItemIcon[currentPoke] = iconUrl;
      setItemIcon(copyOfItemIcon);
    }
    setVisibleItemList(false);
    setFilterItemList([]);
  };

  const keyDown = (e) => {
    if (selectIndex === -1) {
      return;
    }

    if (e.key === "Enter") {
      ref.current.value = filterItemList[selectIndex];
      changeItemForm(ref.current.value);
    }

    if (e.key === "ArrowDown") {
      if (filterItemList.length - 1 > selectIndex) {
        setSelectIndex((selectIndex) => selectIndex + 1);
      }
    }

    if (e.key === "ArrowUp") {
      if (selectIndex > 0) {
        setSelectIndex((selectIndex) => selectIndex - 1);
      }
    }
  };

  const addItemLists = (value: string) => {
    if (value === "") {
      setFilterItemList([]);
      return;
    }

    const list = [];

    for (let item of Object.keys(itemsData)) {
      if (hiraToKana(item).indexOf(hiraToKana(value)) === 0) {
        list.push(item);
      }

      if (list.length >= 5) {
        break;
      }
    }

    if (list.length === 0) {
      list.push("not found");
    }
    setFilterItemList(list);
  };
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div
        style={{
          marginRight: 0,
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
        onBlur={() =>
          setTimeout(() => changeItemForm(ref.current?.value.trim()), 300)
        }>
        <input
          type="text"
          ref={ref}
          placeholder="アイテム名"
          id="item-name-form"
          autoComplete="off"
          onFocus={() => setVisibleItemList(true)}
          onKeyDown={(e) => keyDown(e)}
          onChange={(e) => addItemLists(e.target.value.trim())}
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            ...style.input,
          }}
        />
        <ul
          style={{
            width: "100%",
            background: "white",
            position: "relative",
            zIndex: 1,
            left: 0,
            top: -18,
            paddingLeft: 0,
            borderRadius: 5,
          }}>
          {visibleItemList &&
            filterItemList.map((item, index) => (
              <div key={item}>
                <li
                  style={{
                    listStyle: "none",
                    fontSize: 16,
                    textAlign: "left",
                    padding: 6,
                    background: `${
                      index === selectIndex ? "lightgrey" : "white"
                    }`,
                  }}
                  onClick={() => changeItemForm(item)}>
                  {item}
                </li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
});

export default ItemForm;
