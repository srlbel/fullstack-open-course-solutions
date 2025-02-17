// import { isNotNumber } from "./utils";

type Result =
  | "Underweight"
  | "Normal Range"
  | "Overweight Type 1"
  | "Overweight Type 2"
  | "Overweight Type 3";

// type Args = {
//   height: number;
//   weight: number;
// };

export function calculateBmi(height: number, weight: number): Result {
  const heightMeters = height / 100;
  const bmi = Number((weight / heightMeters ** 2).toFixed(1));

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    return "Normal Range";
  } else if (bmi >= 23.0 && bmi <= 24.9) {
    return "Overweight Type 1";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight Type 2";
  } else {
    return "Overweight Type 3";
  }
}

// const parseArguments = (args: string[]): Args => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (args.length > 4) throw new Error("To many arguments");

//   if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided args where not numbers.");
//   }
// };

// const { height, weight } = parseArguments(process.argv);
// console.log(calculateBmi(height, weight));
