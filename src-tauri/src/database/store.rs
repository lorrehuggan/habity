use std::fs::OpenOptions;

use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
use tauri::{App, Manager};

pub async fn setup_db(app: &App) -> Pool<Sqlite> {
    let mut path = app.path().app_local_data_dir().unwrap();

    path.push("db.sqlite");

    println!("Database path: {:?}", path);

    let result = OpenOptions::new().create_new(true).write(true).open(&path);

    match result {
        Ok(_) => println!("Database created at: {:?}", path),
        Err(e) => match e.kind() {
            std::io::ErrorKind::AlreadyExists => println!("Database already exists at: {:?}", path),
            _ => panic!("Error creating database: {:?}", e),
        },
    }

    let db = SqlitePoolOptions::new()
        .connect(path.to_str().unwrap())
        .await
        .unwrap();

    sqlx::migrate!("./migrations").run(&db).await.unwrap();

    db
}
