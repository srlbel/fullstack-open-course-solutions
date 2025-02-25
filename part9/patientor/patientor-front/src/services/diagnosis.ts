import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Diagnosis } from "../types";

const getAll = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);

  return data;
};

export default {
  getAll,
};
