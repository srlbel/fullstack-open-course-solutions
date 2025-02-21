import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import Content from "./components/Content";
import { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const entries = await diaryService.getDiaries();
        setDiaries(entries);
      } catch (e) {
        console.error(e);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <>
      <Content diaries={diaries} />
    </>
  );
}

export default App;
