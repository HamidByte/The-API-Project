## Session Middleware

We utilize `connect-session-sequelize` to automatically create a Session table in the database and sync whenever a new session is initiated, ensuring synchronization with the database. This middleware tracks incoming requests, updating the session in the database, and responds with an encrypted cookie.

In order to configure it to create a new column named `userId` with a default value of `null` and update it upon user login, note that `connect-session-sequelize` doesn't inherently support this feature. However, you can achieve this by manually modifying the table structure in your PostgreSQL database.

Manually adjust the `Sessions` table in your PostgreSQL database by adding the `userId` column with a default value of `null`:

```sql
ALTER TABLE "Sessions" ADD COLUMN "userId" UUID DEFAULT NULL;
```
