import React from "react";
import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

export default class DB extends React.Component{
  constructor(props){
    super(props);
    enablePromise(true);
  }

  getDBconnection = async () => {
    return openDatabase({name:'taskdb.db',location:'default'});
  }

  createTable = async (db) => {
    let query = `CREATE TABLE IF NOT EXISTS task_table (
       task_id TEXT ,
       task_title TEXT , 
       task_note TEXT ,
       task_min INTEGER ,
       task_hour INTEGER ,
       task_day INTEGER ,
       task_month INTEGER ,
       task_year INTEGER 
  );`;
    await db.executeSql(query);

    query = `CREATE UNIQUE INDEX IF NOT EXISTS idx_task_id ON task_table(task_id)`
    await db.executeSql(query)
  }

  getTasklist = async (db) => {
    try {
      let task_list = []
      results = await db.executeSql(`SELECT * FROM task_table`)
      results.forEach(element => {
        for (let i = 0; i< element.rows.length;i++){
          task_list.push(element.rows.item(i))
        }
      });
      return task_list
    }
    catch(error){
      console.error(error)
    }
  }

  saveToTasklist = async (db, task_list) => {
    let query = `INSERT OR REPLACE INTO task_table(task_id, task_title, task_note, task_min, task_hour, task_day, task_month, task_year) VALUES` + task_list.map(i => `('${i.task_id}','${i.task_title}','${i.task_note}',${i.task_min},${i.task_hour},${i.task_day},${i.task_month},${i.task_year})`).join(',')
    await db.executeSql(query)
  }

  deleteTasklist = async (db) => {
    let query = `drop table task_table`
    await db.executeSql(query)
  }
}