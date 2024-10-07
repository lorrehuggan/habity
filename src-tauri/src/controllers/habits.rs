use crate::AppState;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../src/types/")]
pub struct Habit {
    name: String,
    description: String,
    created: String,
    color: String,
    progress: i32,
    completion_count: i32,
}

#[tauri::command]
pub async fn get_habits(state: tauri::State<'_, AppState>) -> Result<Vec<Habit>, String> {
    let db = &state.db;
    // draft habit --->
    // let habit = Habit {
    //     name: "Walk 5 glasses of water".to_string(),
    //     description: "Drink at least 5 glasses of water a day".to_string(),
    //     created: "2024-05-24".to_string(),
    //     color: "green".to_string(),
    //     progress: 1,
    //     completion_count: 1,
    // };
    // let record: Option<Habit> = db.create("habit").content(habit).await.unwrap();
    // println!("{:?}", record);

    let habits: Vec<Habit> = db.select("habit").await.unwrap();

    Ok(habits)
}
