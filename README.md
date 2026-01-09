<h1 align="center" id="title">BLOCKGPT</h1>

<p align="center"><img src="https://lh3.googleusercontent.com/d/130Wt-cJt_U4iHTOwGJFFGlZapD48ZdYU=w50?authuser=0" alt="project-image"></p>


<p id="description">BLOCKGPT, an assistant for blockchain domain. Built using Langgraph, FastAPI, Groq, it serves as an LLM-powered tool that understands and responds to queries specific to blockchain concepts, protocols, and development workflows. The project integrates custom-trained datasets relevant to decentralized systems, smart contracts, and on-chain terminology to provide more accurate, domain-focused insights than general-purpose language models.</p>


<h2>Project Screenshots:</h2>

<img src="https://lh3.googleusercontent.com/d/1idKlj1lBEnAqN_WHMaGutLcOJ3uVSUIz=w1000?authuser=0" alt="project-screenshot" width="1000" height="400/">

<img src="https://lh3.googleusercontent.com/d/1yRclZaOz9Tfw2a_xkEf3eRPjboISxTDy=w1000?authuser=0" alt="project-screenshot" width="1000" height="400/">

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
