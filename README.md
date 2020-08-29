# Workout Log Server


Endpoint | Verb | Tested Screenshot
------------ | ------------- | -------------
/user/register | POST | ![Allows a new user to be created with a username and password.](images/register.jpg)
/user/login | POST |  ![Allows log in with an existing user.](images/login.jpg)
/log/ | POST |  ![Allows users to create a workout log with descriptions, definitions, results, and owner properties.](images/post.jpg)
/log/ | GET |  ![Gets all logs for an individual user.](images/user_logs.jpg)
/log/:id | GET |  ![Gets individual logs by id for an individual user.](images/get_log.jpg)
/log/:id | PUT |  ![Allows individual logs to be updated by a user.](images/update.jpg)
/log/:id | DELETE |  ![Allows individual logs to be deleted by a user.](images/delete.jpg)