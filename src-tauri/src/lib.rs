mod controllers;
mod database;
mod timeline;
mod tools;

use database::store;
use sqlx::{Pool, Sqlite};
use tauri::Manager as _;

struct AppState {
    db: Pool<Sqlite>,
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            tauri::async_runtime::block_on(async {
                let db = store::setup_db(app).await;
                let state = AppState { db };
                app.manage(state);
            });
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            // habits
            controllers::habits::create_habit,
            controllers::habits::get_habits,
            controllers::habits::update_habit,
            controllers::habits::archive_habit,
            controllers::habits::get_archived_habits,
            controllers::habits::delete_habit,
            controllers::habits::restore_habit,
            // commits
            controllers::commit::create_commit,
            controllers::commit::get_commits,
            controllers::commit::delete_commit,
            // timeline
            timeline::graph::create_timeline,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
