import { createContext, useContext, useEffect, useState } from "react";

/**
 * 내가 관심 있는 아이돌을 제어하는 Context API입니다.
 */
export const IdolContext = createContext();

export default function IdolContextProvider({ children }) {
  const [idols, setIdols] = useState([]);

  useEffect(() => {
    const idolList = localStorage.getItem("idols");
    if (idolList) {
      try {
        setIdols(JSON.parse(idolList));
      } catch (err) {
        console.log("내가 관심 있는 아이돌 정보를 불러올 수 없습니다. 새로 세팅합니다.");
        localStorage.setItem("idols", JSON.stringify([]));
        setIdols([]);
      }
    } else {
      localStorage.setItem("idols", JSON.stringify([]));
      setIdols([]);
    }
  }, []);

  return <IdolContext value={{ idols, setIdols }}>{children}</IdolContext>;
}

export function useIdols() {
  const { idols } = useContext(IdolContext);
  return idols;
}

export function useSetIdols() {
  const { setIdols } = useContext(IdolContext);
  function handleChangeIdols(newList = []) {
    setIdols(newList);
    localStorage.setItem("idols", JSON.stringify(newList));
  }
  return handleChangeIdols;
}
