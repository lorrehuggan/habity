use crate::tools::utils::TauriResponse;
use crate::AppState;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io;

#[derive(Serialize, Deserialize, Debug)]
pub struct Settings {
    theme: String,
    week_start_on_sunday: bool,
    show_category_filter: bool,
    highlight_current_day: bool,
}

impl Settings {
    fn new() -> Self {
        Self {
            theme: "dark".to_string(),
            week_start_on_sunday: true,
            show_category_filter: true,
            highlight_current_day: true,
        }
    }
    pub fn load(state: tauri::State<'_, AppState>) -> Result<Self, io::Error> {
        let settings_dir = state.settings_dir.clone();
        println!("{:?}", settings_dir);

        if !settings_dir.exists() {
            println!("Settings file does not exist, creating new settings file");
            let settings = Self::new();
            let settings_json = serde_json::to_string(&settings).unwrap();
            fs::write(&settings_dir, settings_json).unwrap();
            return Ok(settings);
        }

        let settings_json = fs::read_to_string(&settings_dir)?;
        let settings: Self = serde_json::from_str(&settings_json)?;

        Ok(settings)
    }
    pub fn save(settings: Settings, state: tauri::State<'_, AppState>) -> Result<(), io::Error> {
        let settings_dir = state.settings_dir.clone();
        let file = fs::File::create(settings_dir)?;
        serde_json::to_writer(&file, &settings)?;
        Ok(())
    }
}

#[tauri::command]
pub async fn get_settings(state: tauri::State<'_, AppState>) -> Result<Settings, String> {
    match Settings::load(state) {
        Ok(settings) => Ok(settings),
        Err(e) => Err(format!("Failed to get settings: {}", e)),
    }
}

#[tauri::command]
pub async fn update_settings(
    state: tauri::State<'_, AppState>,
    settings: Settings,
) -> Result<TauriResponse, String> {
    match Settings::save(settings, state) {
        Ok(_) => Ok(TauriResponse {
            message: "Settings updated".to_string(),
            error: false,
        }),
        Err(e) => Err(format!("Failed to update settings: {}", e)),
    }
}
