import { DiaryEntry } from "../types";
import Diary from "./Diary";

const Content = ({ diaries }: { diaries: DiaryEntry[] }) => {
  if (diaries.length < 1) return <h2>Diary Entries</h2>;

  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <Diary diary={diary} key={diary.id} />
      ))}
    </>
  );
};

export default Content;
