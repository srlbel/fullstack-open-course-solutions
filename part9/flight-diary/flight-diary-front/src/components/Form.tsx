import { useState } from "react";
import { Visibility, Weather, type NewDiaryEntry } from "../types";

const Form = ({
  addNewDiary,
}: {
  addNewDiary: (entry: NewDiaryEntry) => void;
}) => {
  const [diary, setDiary] = useState<NewDiaryEntry>({
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: "",
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addNewDiary(diary);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <b>date: </b>
        <input
          type="date"
          value={diary.date}
          onChange={(e) => setDiary({ ...diary, date: e.target.value })}
        />
        <br />
        <b>visibility: </b>
        {Object.values(Visibility).map((value) => (
          <label key={value}>
            {value}
            <input
              type="radio"
              name="visibility"
              value={value}
              checked={diary.visibility === value}
              onChange={() => setDiary({ ...diary, visibility: value })}
            />
          </label>
        ))}
        <br />
        <b>weather</b>{" "}
        {Object.values(Weather).map((value) => (
          <label key={value}>
            {value}
            <input
              type="radio"
              name="weather"
              value={value}
              checked={diary.weather === value}
              onChange={() => setDiary({ ...diary, weather: value })}
            />
          </label>
        ))}
        <br />
        <b>comment: </b>
        <input
          type="text"
          value={diary.comment}
          onChange={(e) => setDiary({ ...diary, comment: e.target.value })}
        />{" "}
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Form;
