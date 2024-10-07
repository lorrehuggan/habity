pub fn initial_migration() -> String {
    String::from(
        "
DEFINE TABLE IF NOT EXISTS habit SCHEMAFULL
;
DEFINE FIELD name ON habit TYPE string
;
DEFINE FIELD description ON habit TYPE string
;
DEFINE FIELD created ON habit TYPE string
;
DEFINE FIELD color ON habit TYPE string
;
DEFINE FIELD progress ON habit TYPE number
;
DEFINE FIELD completion_count ON habit TYPE number
;

DEFINE TABLE IF NOT EXISTS commit SCHEMAFULL
;
DEFINE FIELD habit ON commit TYPE record<Habit>
;
DEFINE FIELD created ON commit TYPE string
;
DEFINE FIELD commited ON commit TYPE string
;
DEFINE FIELD note ON commit TYPE string
;
DEFINE FIELD completions ON commit TYPE number
;
",
    )
}
