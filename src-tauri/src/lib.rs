mod controllers;
mod database;
mod timeline;
mod tools;

use std::path::PathBuf;

use database::store;
use sqlx::{Pool, Sqlite};
use tauri::Manager;

struct AppState {
    db: Pool<Sqlite>,
    settings_dir: PathBuf,
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            tauri::async_runtime::block_on(async {
                let db = store::setup_db(app).await;
                let mut settings_dir = app.path().app_local_data_dir().unwrap();
                settings_dir.push("settings.json");

                let state = AppState { db, settings_dir };
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
            // settings
            controllers::settings::get_settings,
            controllers::settings::update_settings,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
