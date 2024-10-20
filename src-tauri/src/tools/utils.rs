use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct TauriResponse {
    pub message: String,
    pub error: bool,
}
