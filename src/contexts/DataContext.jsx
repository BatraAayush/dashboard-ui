import { createContext, useContext, useState } from "react";
import axios from "axios";

import { API_URL } from "../constants";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      if (data.length === 0) {
        const res = await axios.get(`${API_URL}/device-data`);
        const { data } = res;
        setData(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
