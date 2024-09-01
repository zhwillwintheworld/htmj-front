import  { createContext, useContext, useState } from 'react';

// 创建一个 Context 用于保存 table 数据
const TableContext = createContext();

export const useTable = () => useContext(TableContext);

