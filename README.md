# QuizAppNestJs - Besides The Park

## Instructions on how to run the app:
- ### Tests: npm run test
- ### 1) Configure docker
    - Start docker engine 
    - Run follwing commands: 
      - docker network create mongo-express-network
      - docker compose up --build
- ### 2) You shoud be able to enter the following sites:
    - http://localhost:3001/graphql
    - http://localhost:8082 login: admin:pass
## Instructions on how to work with the app.:
- ### Postman:
    - ### Setup:
        - Content-Type : application/json
    - ### 1) Creating a quiz
        - create a teacher: https://pastebin.com/B8U1wv08
        - create a student: https://pastebin.com/wiQQ7bXG
        - create a quiz: https://pastebin.com/PjTcmvTr
    - ### 2) Fetching a quiz
        - provide <assigned-student-id> and a <your-quiz-id>
        - http://localhost:3001/quiz?quizId=<your-quiz-id>&studentId=<assigned-student-id>
    - ### 3) Answering to the quiz:
        - 
- ### GraphQl:
    - #### 1) Creating a quiz:
        - create a teacher: https://pastebin.com/4GJcmJkU
        - create a student/s: https://pastebin.com/v0tQJepZ
        - create a quiz: https://pastebin.com/QKwH93wM
            - pass the teacher's id you've created previously
            - assign students to a quiz by providing their ids
    - #### 2) Fetching a quiz:
        - provide allowed userId and a quizId
        - https://pastebin.com/0yUp21E3
    - #### 3) Answering to the quiz:
        - https://pastebin.com/p70mdLGW
