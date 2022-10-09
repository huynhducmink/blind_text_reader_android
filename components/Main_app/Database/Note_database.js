import React from "react";
import { enablePromise, openDatabase, SQLiteDatabase } from "react-native-sqlite-storage";

export default class noteDB extends React.Component{
  constructor(props){
    super(props);
    enablePromise(true);
  }

  getDBconnection = async () => {
    return openDatabase({name:'db.db',location:'default'});
  }

  createtable = async (db) => {
    let query = `CREATE TABLE IF NOT EXISTS note_table (
       note_id TEXT ,
       note_title TEXT , 
       note_note TEXT
  );`;
    await db.executeSql(query);

    query = `CREATE UNIQUE INDEX IF NOT EXISTS idx_note_id ON note_table(note_id)`
    await db.executeSql(query)
  }

  getnotelist = async (db) => {
    try {
      let note_list = []
      results = await db.executeSql(`SELECT * FROM note_table`)
      results.forEach(element => {
        for (let i = 0; i< element.rows.length;i++){
          note_list.push(element.rows.item(i))
        }
      });
      return note_list
    }
    catch(error){
      console.error(error)
    }
  }

  savetonotelist = async (db, note_list) => {
    let query = `INSERT OR REPLACE INTO note_table(note_id, note_title, note_note) VALUES` + note_list.map(i => `('${i.note_id}','${i.note_title}','${i.note_note}')`).join(',')
    await db.executeSql(query)
  }

  deletenote = async (db,id) => {
    let query = `DELETE from note_table where note_id = ${id}`
    await db.executeSql(query)
  }

  deletenotelist = async (db) => {
    let query = `drop table note_table`
    await db.executeSql(query)
  }
}