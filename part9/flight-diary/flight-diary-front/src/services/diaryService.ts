import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const newDiary = async (diary: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post<NewDiaryEntry>(baseUrl, diary);
  return response.data as DiaryEntry;
};

export default {
  getDiaries,
  newDiary,
};
