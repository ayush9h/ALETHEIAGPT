<h1 align="center" id="title" style="display:flex; align-items:center; justify-content:center; gap:12px;">
  ALETHEIAGPT
</h1>

<p align="center">
ALETHEIAGPT is a modern web-based platform for interacting with an AI-powered conversational system. It provides a responsive, component-driven UI optimized for real-time chat, analytics visualization, and rich, markdown-based AI responses.
</p>


<p align="center">
  <img src="https://www.infralovers.com/images/posts/ai-for-devops-engineers/langchain_logo.png" height="45" alt="LangGraph / LangChain"/>
  <img src="https://miro.medium.com/1*b9wiAr_HG6ct7uYtCnf0xA.png" height="28" alt="Groq"/>
  <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="45" alt="Next.js"/>
  <img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" height="45" alt="FastAPI"/>
  <img src="https://cdn.worldvectorlogo.com/logos/postgresql.svg" height="45" alt="PostgreSQL"/>
  <img src="https://brandlogos.net/wp-content/uploads/2025/10/docker_mark-logo_brandlogos.net_yetav.png" height="45" alt="Docker"/>
</p>>

<figure align="center">
  <img src="https://lh3.googleusercontent.com/d/1sfIfVvmuJ2UJuvEdxr1S4zRv62r96GFx=w1000?authuser=0" alt="Model Selection Interface" width="1000">
  <figcaption><b>Figure 1:</b> Model Selection Interface</figcaption>
</figure>

<figure align="center">
  <img src="https://lh3.googleusercontent.com/d/1i1J_b5U3qGiMl_jLAgay3xc7x4mESfOe=w1000?authuser=0" alt="Personalization Options" width="1000">
  <figcaption><b>Figure 2:</b> Personalization Options</figcaption>
</figure>

<figure align="center">
  <img src="https://lh3.googleusercontent.com/d/1pi-U99cqAePW2lhJbvrQFif9JvBlyXak=w1000?authuser=0" alt="Chat Interface" width="1000">
  <figcaption><b>Figure 3:</b> Chat Interface</figcaption>
</figure>

<h2>🛠️ Installation Steps:</h2>

<strong>Follow steps to install client dependencies:</strong>

<p>1. Navigate to client directory</p>

<pre><code>cd client</code></pre>

<p>2. Install dependencies</p>

<pre><code>npm install</code></pre>

<p>3. Set environment variables</p>

<pre><code>GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
NEXTAUTH_SECRET
NEXT_PUBLIC_API_URL</code></pre>

<p>4. Run client</p>

<pre><code>npm run dev</code></pre>

<strong>Follow steps to install server dependencies:</strong>

<p>1. Create virtual environment</p>

<pre><code>python -m venv .venv</code></pre>

<p>2. Activate virtual environment</p>

<pre><code>./.venv/Scripts/activate</code></pre>

<p>3. Set environment variables</p>

<pre><code>GROQ_API_KEY=
DB_URL=</code></pre>

<p>4. Docker Build Command</p>

<pre><code>docker build -t server .</code></pre>

<p>5. Run the Docker Container or use Docker Compose</p>

<pre><code>docker run -p 8080:8080 server</code></pre>

<pre><code>docker compose up</code></pre>
