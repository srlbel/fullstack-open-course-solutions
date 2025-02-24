import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import Content from "./components/Content";
import { DiaryEntry, NewDiaryEntry } from "./types";
import Form from "./components/Form";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const handleNewDiary = async (diary: NewDiaryEntry) => {
    const response = await diaryService.newDiary(diary);
    setDiaries(diaries.concat(response));
  };

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
      <Form addNewDiary={handleNewDiary} />
      <Content diaries={diaries} />
    </>
  );
}

export default App;
