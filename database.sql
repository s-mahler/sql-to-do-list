CREATE TABLE "toDoList" (
"id" serial PRIMARY KEY,
"task" VARCHAR(200) NOT NULL,
"complete" BOOLEAN
)

INSERT INTO "toDoList"("id", "task", "complete")
VALUES(1, 'Weekend HW', false) 
RETURNING "id", "task", "complete";