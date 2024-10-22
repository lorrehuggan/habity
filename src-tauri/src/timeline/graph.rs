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

#[cfg(test)]
mod tests {
    use super::*;

    // create_timeline should return a Timeline struct with 7 days
    #[test]
    fn test_create_timeline() {
        let timeline = Timeline::new();
        assert_eq!(timeline.days.len(), 7);
    }

    // create_timeline should return a Timeline struct with 26 entries for each day of the week
    #[test]
    fn test_create_timeline_days() {
        let timeline = Timeline::new();
        assert_eq!(timeline.days.get("Sun").unwrap().len(), 26);
        assert_eq!(timeline.days.get("Mon").unwrap().len(), 26);
        assert_eq!(timeline.days.get("Tue").unwrap().len(), 26);
        assert_eq!(timeline.days.get("Wed").unwrap().len(), 26);
        assert_eq!(timeline.days.get("Thu").unwrap().len(), 26);
        assert_eq!(timeline.days.get("Fri").unwrap().len(), 26);
        assert_eq!(timeline.days.get("Sat").unwrap().len(), 26);
    }

    // Test that the `new` method initializes a timeline with 160 entries (including today and the last 154 days)
    #[test]
    fn test_timeline_new() {
        let timeline = Timeline::new();
        assert_eq!(timeline.days.len(), 7); // There are 7 weekdays in a week
        for entry in timeline.days.values() {
            assert_eq!(entry.len(), 26); // Each weekday should have entries for approximately 23 days (182/7 + 1)
        }
    }

    // Test that the `new` method initializes a timeline with unique dates
    #[test]
    fn test_timeline_unique_dates() {
        let timeline = Timeline::new();
        for entries in timeline.days.values() {
            let mut unique_dates: Vec<String> = entries.clone();
            unique_dates.sort();
            unique_dates.dedup();
            assert_eq!(unique_dates.len(), entries.len()); // Ensure no dates are duplicated within a week
        }
    }

    // Test serialization and deserialization of the `Timeline` struct using serde
    #[test]
    fn test_serde() {
        let timeline = Timeline::new();
        let serialized = serde_json::to_string(&timeline).unwrap();
        let deserialized: Timeline = serde_json::from_str(&serialized).unwrap();
        assert_eq!(timeline.days, deserialized.days);
    }
}
