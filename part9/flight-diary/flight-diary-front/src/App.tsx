import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import Content from "./components/Content";
import { DiaryEntry, NewDiaryEntry } from "./types";
import Form from "./components/Form";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>("");

  const handleNewDiary = async (diary: NewDiaryEntry) => {
    try {
      const response = await diaryService.newDiary(diary);
      setDiaries(diaries.concat(response));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message || e.response?.data || e.message);
        setTimeout(() => setError(""), 5000);
      } else {
        console.error(e);
      }
    }
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form addNewDiary={handleNewDiary} />
      <Content diaries={diaries} />
    </>
  );
}

export default App;
