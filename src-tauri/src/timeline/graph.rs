use chrono::{prelude::*, Duration};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// Import the module containing the `Timeline` struct
#[derive(Debug, Serialize, Deserialize)]
pub struct Timeline {
    days: HashMap<String, Vec<String>>,
}

impl Timeline {
    #[allow(clippy::redundant_closure)]
    pub fn new() -> Self {
        let now = Local::now();
        let start = now - Duration::days(182);
        let diff = now.signed_duration_since(start).num_days();
        let mut days = HashMap::new();

        for i in 6..diff + 6 {
            // Including today and the last 154 days
            let date = start + Duration::days(i);

            days.entry(date.weekday().to_string())
                .or_insert_with(|| Vec::new());

            days.get_mut(&date.weekday().to_string())
                .unwrap()
                .push(date.format("%Y-%m-%d").to_string());
        }

        Self { days }
    }
}

#[tauri::command]
pub fn create_timeline() -> Timeline {
    Timeline::new()
}
