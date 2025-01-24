# Capstone Project - PWA Parent Reporting Dashboard

- Team Member: Christopher Alexander Tjiandra & Joshua Alexander Silalahi 
- Student ID: 22081418 & 22081358
- Shared Repository: https://github.com/JugBones/Capstone.git 

## Overview
This project is a Progressive Web Application (PWA) developed as part of a capstone project at Binus International University, in collaboration with CoLearn. The system aims to enhance the existing reporting system by providing parents with actionable, real-time insights into their children's learning journey.

### Key Features
This project addresses the limitations of the current system by:
- Holistic Progress Tracking: Goes beyond the correctness of answers to provide a comprehensive view of learning progress.
- Detailed Insights: Highlights subtopics and learning gaps to identify areas for improvement.
- Seamless Reporting: Delivers an intuitive and visually appealing reporting experience for parents.
- Actionable Recommendations: Encourages active parent-student interactions with meaningful and practical suggestions.


## Technologies Used
- React: For the front-end user interface.
- Python: For the backend handling.
- MySQL: Database storage (SQL)
- Firebase: Authentication (NoSQL)
- FastAPI: API connection

## Application Structure
Can be seen by simply using git ingest. Just replace the 'hub' into 'ingest' in the link of this repository. 

## How to Run the Application (Frontend)
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>

2. **Installing dependencies & Initialize the project**:
   ```bash
   npm install
   npm start

2. **For Production**:
   ```bash
   npm install -g serve
   serve -s build


## How to Run the Application (Backend)

## Project Setup
### 1. Create a Virtual Environment:
```
python -m venv BEenv
```

### 2. Activate venv
Mac:
```
source BEColearn/bin/activate
```

Windows:
```
BEColearn/Scripts/activate
```

### 3. Download Requirements
```
pip install -r requirements.txt
```

## How to run
### 1. Navigate to the project directory
```
cd <project_directory>/backend
```

### 2. Run using uvicorn
```
uvicorn main:app --reload
```

## Deployment
- Database: deployed on clever cloud.
- Backend: Soon.
- Frontend: Soon.