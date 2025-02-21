import { DiaryEntry } from "../types";

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <>
      <h3>{diary.date}</h3>
      <p>
        visibility: {diary.visibility} <br />
        weather: {diary.weather}
      </p>
    </>
  );
};

export default Diary;
