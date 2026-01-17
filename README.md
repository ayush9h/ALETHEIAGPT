<h1 align="center" id="title">ALETHEIAGPT</h1>

<p align="center"><img src="https://lh3.googleusercontent.com/d/130Wt-cJt_U4iHTOwGJFFGlZapD48ZdYU=w50?authuser=0" alt="project-image"></p>


<p id="description">ALETHEIA, an assistant for your everyday tasks. Built using Langgraph, FastAPI, Groq, it serves as an LLM-powered tool that understands and responds to queries.</p>
<h2>Project Screenshots:</h2>

<img src="https://lh3.googleusercontent.com/d/1QK8ycOhrPpTPmTRBqwbdwP9bxTmgufeE=w1000?authuser=0" alt="project-screenshot" width="1000" height="400/">

<img src="https://lh3.googleusercontent.com/d/1T6aYmd-a-irddYY4T_OUsuy7ih3C8XXb=w1000?authuser=0" alt="project-screenshot" width="1000" height="400/">

<img src="https://lh3.googleusercontent.com/d/1uRXIxNlxtiiHbFXmi_Yx-h-aTmBXW-ID=w1000?authuser=0" alt="project-screenshot" width="1000" height="400/">


<h2>🛠️ Installation Steps:</h2>

<p>1. Create virtual environment</p>

```
python -m venv .venv
```

<p>2. Activate virtual environment</p>

```
./.venv/Scripts/activate
```

<p>3. Set environment variables</p>

```
GROQ_API_KEY=
```

<p>4. Build Command</p>

```
docker build -t server .
```

<p>5. Run build command</p>

```
docker run -p 8080:8080 server
```
