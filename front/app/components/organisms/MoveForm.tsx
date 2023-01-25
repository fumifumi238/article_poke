import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { MoveRefsContext } from "../templates/RegisterPokemon";
import movesData from "../../json/moves.json";
import { hiraToKana } from "../../utils/hiraToKana";

type MoveForm = {
  index: number;
};

const MoveForm = ({ index }: MoveForm) => {
  const [filterMoveList, setFilterMoveList] = useState<string[]>([]);
  const [visibleMoveList, setVisibleMoveList] = useState<boolean>(false);
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { moveRefs } = useContext(MoveRefsContext);
  const moveRef = moveRefs.current[
    index
  ] as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (filterMoveList.length !== 0 && filterMoveList[0] !== "not found") {
      setSelectIndex(0);
    } else {
      setSelectIndex(-1);
    }
  }, [filterMoveList]);

  const focusNextRef = () => {
    if (index < 3) {
      moveRefs.current[index + 1]?.current.focus();
    }
  };

  const changeMoveForm = (value: string) => {
    if (value !== undefined) {
      moveRef.current.value =
        Object.keys(movesData).find((move) => move === value) !== undefined
          ? value
          : "";
    }
    setVisibleMoveList(false);
    setFilterMoveList([]);
  };

  const keyDown = (e) => {
    if (selectIndex === -1) {
      return;
    }

    if (e.key === "Enter") {
      moveRef.current.value = filterMoveList[selectIndex];
      changeMoveForm(moveRef.current.value);
      focusNextRef();
    }

    if (e.key === "ArrowDown") {
      if (filterMoveList.length - 1 > selectIndex) {
        setSelectIndex((selectIndex) => selectIndex + 1);
      }
    }

    if (e.key === "ArrowUp") {
      if (selectIndex > 0) {
        setSelectIndex((selectIndex) => selectIndex - 1);
      }
    }
  };

  const addMoveLists = (value: string) => {
    if (value === "") {
      setFilterMoveList([]);
      return;
    }

    value = hiraToKana(value).toUpperCase();

    const list = [];

    for (let move of Object.keys(movesData)) {
      if (hiraToKana(move).indexOf(value) === 0) {
        list.push(move);
      }

      if (list.length >= 3) {
        break;
      }
    }

    if (list.length === 0) {
      list.push("not found");
    }
    setFilterMoveList(list);
  };
  return (
    <>
      <Box
        onBlur={() =>
          setTimeout(() => changeMoveForm(moveRef.current?.value.trim()), 300)
        }
        sx={{ position: "relative", width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            height: 49,
            position: "absolute",
            width: "100%",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 49,
            }}>
            <input
              type="text"
              autoComplete="off"
              id={`わざ${index + 1}`}
              ref={moveRef}
              onFocus={() => setVisibleMoveList(true)}
              onKeyDown={(e) => keyDown(e)}
              onChange={(e) => addMoveLists(e.target.value.trim())}
              style={{
                border: "none",
                padding: 0,
                paddingLeft: 10,
                height: 40,
                fontSize: 14,
                fontFamily: "StdN",
                fontWeight: "bolder",
                width: "100%",
                position: "relative",
                zIndex: 0,
                color: "dimgray",
              }}
              placeholder={`わざ${index + 1}`}
            />
          </Box>
          <ul
            style={{
              paddingLeft: 0,
              maxHeight: 240,
              overflow: "auto",
              borderRadius: 5,
              background: "white",
              width: "100%",
              position: "relative",
              zIndex: 1,
              top: -10,
              border: 1,
            }}>
            {visibleMoveList &&
              filterMoveList.map((move, index) => (
                <li
                  key={move}
                  onClick={() => {
                    changeMoveForm(move), focusNextRef();
                  }}
                  style={{
                    listStyle: "none",
                    fontSize: 16,
                    textAlign: "left",
                    padding: 6,
                    background: `${
                      index === selectIndex ? "lightgrey" : "white"
                    }`,
                  }}>
                  {move}
                </li>
              ))}
          </ul>
        </Box>
      </Box>
    </>
  );
};;;

export default MoveForm;
