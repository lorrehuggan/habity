// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod controllers;
mod database;
mod timeline;

use controllers::habits::get_habits;
use database::store;
use surrealdb::{engine::local::Db, Surreal};
use tauri::Manager;
use timeline::graph::create_timeline;

struct AppState {
    db: Surreal<Db>,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, create_timeline, get_habits])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    let db = store::setup_db(&app).await;

    app.manage(AppState { db });
    app.run(|_, _| {});
}
