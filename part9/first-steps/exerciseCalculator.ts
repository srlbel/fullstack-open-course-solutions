import { isNotNumber } from "./utils";

type Rating = "Too bad" | "Almost There" | "Nice!";

interface calculatorOutput {
  periodLenght: number;
  trainingDays: number;
  success: boolean;
  target: number;
  averageTime: number;
  rating: number;
  ratingDescription: Rating;
}

type Args = {
  target: number;
  days: number[];
};

function exerciseCalculator(args: Args): calculatorOutput {
  const { days, target } = args;
  const periodLenght = days.length;
  const trainingDays = days.filter((day) => day > 0).length;
  const averageTime = days.reduce((a, c) => a + c, 0) / periodLenght;
  const success = averageTime > target ? true : false;
  const threshold = target * 0.1;

  let rating: number;
  let ratingDescription: Rating;

  if (success) {
    rating = 3;
    ratingDescription = "Nice!";
  } else if (averageTime > target - threshold) {
    rating = 2;
    ratingDescription = "Almost There";
  } else {
    rating = 1;
    ratingDescription = "Too bad";
  }

  return {
    periodLenght,
    trainingDays,
    success,
    target,
    averageTime,
    rating,
    ratingDescription,
  };
}

const parseArguments = (args: string[]): Args => {
  if (args.length < 12) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("To many arguments");

  const target = args[2];
  const days = args.slice(3).map((day) => Number(day));

  const isNumbers = days.map((day) => !isNotNumber(day)).every(Boolean);

  console.log(days);

  if (!isNotNumber(target) && isNumbers) {
    return {
      target: Number(target),
      days,
    };
  } else {
    throw new Error("Provided args where not numbers.");
  }
};

const args = parseArguments(process.argv);
console.log(exerciseCalculator(args));
