import http from "http";

const PORTA = 3000;

const tokens = new Map();

export function gerarToken(userId, nome, avatar) {

  const token = Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase();

  const expira = Date.now() + 5 * 60 * 1000;

  tokens.set(token, {
    userId,
    nome,
    avatar,
    expira
  });

  return token;
}

function buildPaginaVerificado(nome, avatar, ano) {

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Verificação Concluída — Real Xpuro</title>

<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>

*,
*::before,
*::after{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  --purple:#7c3aed;
  --purple-light:#a855f7;
  --purple-soft:#c084fc;

  --bg:#050505;

  --card:rgba(255,255,255,0.035);

  --border:rgba(168,85,247,0.25);

  --text:#f1f1f1;
  --muted:#8b8b8b;

  --green:#59b268;
}

body{
  min-height:100vh;

  background:
    radial-gradient(circle at top, rgba(124,58,237,0.20), transparent 38%),
    radial-gradient(circle at bottom, rgba(168,85,247,0.10), transparent 35%),
    var(--bg);

  font-family:'DM Sans',sans-serif;
  color:var(--text);

  display:flex;
  align-items:center;
  justify-content:center;

  overflow:hidden;
  padding:20px;
}

body::before{
  content:"";

  position:fixed;
  inset:0;

  background-image:
    linear-gradient(rgba(168,85,247,0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168,85,247,0.045) 1px, transparent 1px);

  background-size:55px 55px;

  mask-image:radial-gradient(circle, black 30%, transparent 75%);

  pointer-events:none;
}

.card{
  width:100%;
  max-width:470px;

  position:relative;

  background:var(--card);

  border:1px solid var(--border);
  border-radius:24px;

  padding:48px 42px;

  text-align:center;

  backdrop-filter:blur(22px);

  box-shadow:0 25px 80px rgba(0,0,0,0.45);

  overflow:hidden;

  animation:show 0.7s ease forwards;
}

.card::before{
  content:"";

  position:absolute;

  top:0;
  left:12%;
  right:12%;

  height:1px;

  background:linear-gradient(
    90deg,
    transparent,
    var(--purple-soft),
    transparent
  );
}

@keyframes show{
  from{
    opacity:0;
    transform:translateY(28px) scale(0.97);
  }

  to{
    opacity:1;
    transform:translateY(0) scale(1);
  }
}

.avatar{
  width:92px;
  height:92px;

  margin:0 auto 22px;

  border-radius:50%;

  border:2px solid rgba(168,85,247,0.35);

  background:rgba(168,85,247,0.10);

  overflow:hidden;

  box-shadow:0 0 35px rgba(124,58,237,0.25);
}

.avatar img{
  width:100%;
  height:100%;

  object-fit:cover;

  display:block;
}

.status{
  display:inline-flex;
  align-items:center;
  gap:8px;

  padding:6px 15px;

  border-radius:999px;

  border:1px solid rgba(89,178,104,0.25);

  background:rgba(89,178,104,0.09);

  color:#8ee49a;

  font-size:10px;
  font-weight:700;

  letter-spacing:2px;
  text-transform:uppercase;

  margin-bottom:20px;
}

.status::before{
  content:"";

  width:7px;
  height:7px;

  border-radius:50%;

  background:var(--green);

  box-shadow:0 0 12px var(--green);
}

h1{
  font-family:'Bebas Neue',sans-serif;

  font-size:43px;

  letter-spacing:2px;

  line-height:1;

  margin-bottom:10px;
}

h1 span{
  color:var(--purple-soft);
}

.subtitle{
  color:var(--muted);

  font-size:13px;
  line-height:1.7;

  margin-bottom:26px;
}

.info-box{
  background:rgba(0,0,0,0.34);

  border:1px solid rgba(255,255,255,0.07);

  border-radius:15px;

  padding:17px 20px;

  text-align:left;

  margin-bottom:26px;
}

.info-row{
  display:flex;
  justify-content:space-between;

  gap:15px;

  font-size:13px;

  color:var(--muted);
}

.info-row + .info-row{
  margin-top:12px;
  padding-top:12px;

  border-top:1px solid rgba(255,255,255,0.06);
}

.info-row strong{
  color:var(--text);

  font-weight:700;

  text-align:right;
}

.ok{
  color:#8ee49a;

  font-weight:700;
}

.btn{
  display:inline-block;

  text-decoration:none;

  color:#fff;

  background:linear-gradient(
    135deg,
    #6d28d9,
    #7c3aed,
    #a855f7
  );

  background-size:200% 200%;

  padding:13px 30px;

  border-radius:12px;

  font-size:13px;
  font-weight:800;

  letter-spacing:0.4px;

  animation:shine 3s ease infinite;

  transition:0.2s;
}

.btn:hover{
  opacity:0.88;

  transform:translateY(-2px);
}

@keyframes shine{
  0%,100%{
    background-position:0% 50%;
  }

  50%{
    background-position:100% 50%;
  }
}

.footer{
  margin-top:22px;

  font-size:11px;

  color:#494949;

  letter-spacing:0.5px;
}

</style>
</head>

<body>

<main class="card">

<div class="avatar">
  <img src="${avatar}" alt="Avatar">
</div>

<div class="status">
  Verificação aprovada
</div>

<h1>
  Acesso <span>Liberado</span>
</h1>

<p class="subtitle">
  Sua conta foi verificada com sucesso no sistema da Real Xpuro.<br>
  Agora você já pode acessar as áreas liberadas da organização.
</p>

<div class="info-box">

<div class="info-row">
  <span>👤 Usuário</span>
  <strong>${nome}</strong>
</div>

<div class="info-row">
  <span>✅ Status</span>
  <span class="ok">Verificado</span>
</div>

<div class="info-row">
  <span>🏢 Organização</span>
  <strong>Real Xpuro</strong>
</div>

<div class="info-row">
  <span>🌐 Servidor</span>
  <strong>Horizonte Roleplay 4</strong>
</div>

</div>

<a class="btn" href="https://discord.gg/R9tbFp8nCH">
  Voltar para o Discord
</a>

<p class="footer">
  Real Xpuro © ${ano} — Sistema de Verificação
</p>

</main>

</body>
</html>`;
}

function buildPaginaErro() {

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Link Inválido — Real Xpuro</title>

<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet">

<style>

*,
*::before,
*::after{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  --purple:#7c3aed;
  --purple-soft:#c084fc;
  --bg:#050505;
  --text:#f1f1f1;
  --muted:#8b8b8b;
}

body{
  min-height:100vh;

  background:
    radial-gradient(circle at top, rgba(124,58,237,0.18), transparent 35%),
    radial-gradient(circle at bottom, rgba(168,85,247,0.08), transparent 30%),
    var(--bg);

  font-family:'DM Sans',sans-serif;
  color:var(--text);

  display:flex;
  align-items:center;
  justify-content:center;

  overflow:hidden;
  padding:20px;
}

.card{
  width:100%;
  max-width:430px;

  background:rgba(255,255,255,0.035);

  border:1px solid rgba(168,85,247,0.22);
  border-radius:24px;

  padding:46px 38px;

  text-align:center;

  backdrop-filter:blur(20px);

  box-shadow:0 25px 80px rgba(0,0,0,0.45);
}

.icon{
  width:82px;
  height:82px;

  margin:0 auto 22px;

  border-radius:50%;

  border:2px solid rgba(168,85,247,0.30);

  background:rgba(168,85,247,0.08);

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:34px;

  color:var(--purple-soft);
}

h1{
  font-family:'Bebas Neue',sans-serif;

  font-size:40px;

  color:var(--purple-soft);

  margin-bottom:12px;
}

p{
  color:var(--muted);

  font-size:13px;
  line-height:1.8;
}

.footer{
  margin-top:24px;

  font-size:11px;

  color:#494949;
}

</style>
</head>

<body>

<main class="card">

<div class="icon">
✕
</div>

<h1>
  Link <span>Inválido</span>
</h1>

<p>
Este link expirou, já foi utilizado ou não existe.<br><br>

Volte ao Discord da
<strong style="color:#c084fc;">
Real Xpuro
</strong>
e tente novamente.
</p>

<div class="footer">
Real Xpuro — Sistema de Verificação
</div>

</main>

</body>
</html>`;
}

export function iniciarServidorVerificacao() {

  const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORTA}`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const nome = url.searchParams.get("nome");
  const avatar = url.searchParams.get("avatar");

  if (!nome || !avatar) {
    res.writeHead(404);
    return res.end(buildPaginaErro());
  }

  res.writeHead(200);

  return res.end(
    buildPaginaVerificado(
      nome,
      avatar,
      new Date().getFullYear()
    )
  );
});

    server.listen(PORTA, "0.0.0.0", () => {
    console.log(
      `✅ Servidor de verificação iniciado na porta ${PORTA}`
    );
  });
}

iniciarServidorVerificacao();
