use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{tools::utils::TauriResponse, AppState};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Commit {
    id: String,
    message: String,
    image: String,
    created: String,
    status: String,
    completions: u8,
    habit_id: String,
}

impl Commit {
    pub fn new(habit_id: String) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            habit_id,
            message: String::from("A commit message"),
            image: String::from("https://images.pexels.com/photos/9797982/pexels-photo-9797982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
            created: chrono::Local::now().format("%Y-%m-%d").to_string(),
            status: String::from("completed"),
            completions: 1,
        }
    }
}

#[tauri::command]
pub async fn create_commit(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<TauriResponse, String> {
    let db = &state.db;

    let commit = Commit::new(id);

    let query = r#"
        INSERT INTO commits (id, habit_id, message, image, created, status)
        VALUES ($1, $2, $3, $4, $5, $6)"#;

    sqlx::query(query)
        .bind(commit.id)
        .bind(commit.habit_id)
        .bind(commit.message)
        .bind(commit.image)
        .bind(commit.created)
        .bind(commit.status)
        .execute(db)
        .await
        .map_err(|e| format!("Failed to create commit {}", e))?;

    Ok(TauriResponse {
        message: String::from("success"),
        error: false,
    })
}

#[tauri::command]
pub async fn delete_commit(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<TauriResponse, String> {
    let db = &state.db;

    let query = "DELETE FROM commits WHERE id = $1";

    sqlx::query(query)
        .bind(id)
        .execute(db)
        .await
        .map_err(|e| format!("Failed to delete commit {}", e))?;

    Ok(TauriResponse {
        message: String::from("success"),
        error: false,
    })
}

#[tauri::command]
pub async fn get_commits(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<Vec<Commit>, String> {
    let db = &state.db;

    let query = "SELECT * FROM commits WHERE habit_id = $1";

    let commits = sqlx::query_as::<_, Commit>(query)
        .bind(id)
        .fetch_all(db)
        .await
        .map_err(|e| format!("Failed to get commits {}", e))?;

    Ok(commits)
}
