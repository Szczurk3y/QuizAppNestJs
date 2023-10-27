# QuizAppNestJs - Besides The Park

## Instructions on how to run the app:
- ### Tests: npm run test
- ### 1) Configure docker
    - Start docker engine 
    - Run follwing commands: 
      - docker network create quizapp-network
      - docker compose up --build
- ### 2) You shoud be able to enter the following sites:
    - http://localhost:3001/graphql
    - http://localhost:8080/adminer login: postgres:postgres
## Instructions on how to work with the app.:
- ### GraphQl:
    - #### 1) Creating a quiz:
        - create a teacher: https://pastebin.com/4GJcmJkU
        - create a student/s: https://pastebin.com/v0tQJepZ
        - create a quiz: https://pastebin.com/kN9ZqVE3
            - pass the teacher's id you've created previously
            - assign students to a quiz by providing their ids
    - #### 2) Fetching a quiz:
        - provide allowed userId and a quizId
        - https://pastebin.com/CKRNU2BB
    - #### 3) Answering to the quiz:
        - https://pastebin.com/LEkxxSQD
        - in response you will get pretty summary
- ### Postman:
    - ### Setup:
        - Content-Type : application/json
    - ### 1) Creating a quiz
        - create a teacher: https://pastebin.com/B8U1wv08
        - create a student: https://pastebin.com/wiQQ7bXG
        - create a quiz: https://pastebin.com/PjTcmvTr
    - ### 2) Fetching a quiz
        - provide your-quiz-id and assigned-student-id
        - GET http://localhost:3001/quiz?quizId="your-quiz-id"&studentId="assigned-student-id"
    - ### 3) Answering to the quiz:
        - https://pastebin.com/dTrAwUbn
        - in JSON response you will get pretty summary
