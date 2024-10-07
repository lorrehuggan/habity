use surrealdb::{
    engine::local::{Db, SurrealKV},
    Surreal,
};
use tauri::{App, Manager};

use super::migration::initial_migration;

pub async fn setup_db(app: &App) -> Surreal<Db> {
    let path = app.path().app_local_data_dir().unwrap();

    let db = match Surreal::new::<SurrealKV>(path).await {
        Ok(db) => db,
        Err(err) => {
            panic!("error creating surreal db {}", err);
        }
    };

    db.use_ns("test").use_db("test").await.unwrap();

    db.query(initial_migration()).await.unwrap();

    db
}
