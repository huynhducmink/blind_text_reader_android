import React from "react";
import { enablePromise, openDatabase } from "react-native-sqlite-storage";

export default class db extends React.Component{
  constructor(props){
    super(props);
    enablePromise(true);
  }

  getDBconnection = async () => {
    return openDatabase({name:'taskdb.db',location:'default'});
  }

  createTable = async (database) => {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
      value TEXT NOT NULL
  );`;

    await database.executeSql(query);
  }



}