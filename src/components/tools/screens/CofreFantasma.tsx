import { Button } from "@/components/ui/button";
import "./tool-palettes.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ghost, Fingerprint, RotateCcw, ShieldCheck, ShieldAlert, Wifi, WifiOff, QrCode } from "lucide-react";
import { BARRIERS, entropyBits, isolationScore, isolationVerdict } from "@/lib/tools/cofreFantasma";
import { ToolGuide } from "@/components/tools/ToolGuide";
import "./chave-blindada.css";
import "./cofre-fantasma.css";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollTrigger);

/* Fundo vivo: campo de estática que esfria conforme o isolamento cresce. */
function StaticField({ level }: { level: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const lv = useRef(level); lv.current = level;
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gold = getComputedStyle(c).getPropertyValue("--primary").trim() || "38 72% 52%";
    let w = 0, h = 0, raf = 0, t = 0;
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, w, h);
      const noise = 1 - lv.current / 100;
      // ondas de rádio que perdem força com o isolamento
      for (let k = 0; k < 6; k++) {
        const r = ((t * 260 + k * 160) % (Math.max(w, h)));
        ctx.strokeStyle = `color-mix(in srgb, ${gold} calc((${0.08 * noise * (1 - r / Math.max(w, h))}) * 100%), transparent)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(w * 0.82, h * 0.18, r, 0, Math.PI * 2); ctx.stroke();
      }
      const n = Math.round(260 * noise) + 20;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = `color-mix(in srgb, ${gold} calc((${Math.random() * 0.25}) * 100%), transparent)`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="cb-lattice" />;
}

/* Coletor de entropia: o rastro do dedo ou mouse alimenta um pool SHA-256. */
function EntropyPad() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pool = useRef<number[]>([]);
  const [samples, setSamples] = useState(0);
  const [digest, setDigest] = useState("");
  const bits = entropyBits(samples);

  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return;
    const fit = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; ctx.fillStyle = "hsl(30 25% 5%)"; ctx.fillRect(0, 0, c.width, c.height); };
    fit(); window.addEventListener("resize", fit);
    let last = 0;
    const onMove = (e: PointerEvent) => {
      if (pool.current.length >= 128) return;
      const r = c.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const now = performance.now();
      if (now - last < 16) return; last = now;
      pool.current.push((x * 7919) ^ (y * 104729) ^ Math.floor(now * 1000));
      setSamples(pool.current.length);
      const hue = 30 + (pool.current.length / 128) * 20;
      ctx.fillStyle = `hsl(${hue} 80% 55% / .9)`;
      ctx.beginPath(); ctx.arc(x, y, 3 + Math.random() * 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "hsl(30 25% 5% / .04)"; ctx.fillRect(0, 0, c.width, c.height);
    };
    c.addEventListener("pointermove", onMove);
    return () => { c.removeEventListener("pointermove", onMove); window.removeEventListener("resize", fit); };
  }, []);

  useEffect(() => {
    if (!samples || samples % 8) return;
    const rnd = crypto.getRandomValues(new Uint32Array(8));
    const data = new Uint32Array([...pool.current, ...rnd]);
    crypto.subtle.digest("SHA-256", data).then((b) =>
      setDigest(Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("")));
  }, [samples]);

  const reset = () => {
    pool.current = []; setSamples(0); setDigest("");
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return; ctx.fillStyle = "hsl(30 25% 5%)"; ctx.fillRect(0, 0, c.width, c.height);
  };

  return (
    <div className="cb-plate cf-pad cb-reveal">
      <p className="cb-kicker"><Fingerprint size={14} /> Coletor de entropia</p>
      <p className="cb-muted cb-small">Desenhe livremente dentro do quadro. Cada movimento vira ruído misturado ao gerador criptográfico do navegador.</p>
      <canvas ref={ref} className="cf-canvas" aria-label="Área para desenhar e gerar entropia" />
      <div className="cf-meter"><i style={{ width: `${(bits / 256) * 100}%` }} /></div>
      <div className="cf-meter-row"><span>{bits} / 256 bits estimados</span><Button variant="unstyled" className="cb-reset" onClick={reset}><RotateCcw size={14} /> Recomeçar</Button></div>
      <code className={`cf-digest ${bits >= 256 ? "full" : ""}`}>{digest ? digest.match(/.{1,8}/g)?.join(" ") : "aguardando movimento..."}</code>
      <p className="cb-note">Demonstração. Não use este valor como semente: gere chaves reais no próprio assinador offline, com dados físicos.</p>
    </div>
  );
}

const FLOW = [
  { id: "online", t: "Computador online", d: "Monta a transação não assinada (PSBT)", icon: Wifi },
  { id: "qr1", t: "QR ou cartão SD", d: "Leva o PSBT sem cabo de dados", icon: QrCode },
  { id: "offline", t: "Assinador offline", d: "Confere destino e valor, assina", icon: WifiOff },
  { id: "qr2", t: "QR de volta", d: "Só a assinatura atravessa", icon: QrCode },
  { id: "rede", t: "Transmissão", d: "O computador online publica", icon: Wifi },
];

export default function CofreFantasma() {
  const [on, setOn] = useState<Set<string>>(new Set(["wifi", "qr"]));
  const score = isolationScore(on);
  const v = isolationVerdict(score);
  const root = useRef<HTMLDivElement>(null);
  const flow = useRef<SVGSVGElement>(null);
  const gauge = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.utils.toArray<HTMLElement>(".cb-reveal").forEach((el) =>
      gsap.from(el, { y: 40, opacity: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
    gsap.from(".cb-title span", { yPercent: 110, stagger: .08, duration: 1, ease: "expo.out" });
    gsap.to(".cf-ghost", { y: -10, yoyo: true, repeat: -1, duration: 2.2, ease: "sine.inOut" });
  }, { scope: root });

  useGSAP(() => {
    const p = flow.current?.querySelector<SVGPathElement>("#cf-flow-path");
    if (!p || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(".cf-packet", { duration: 4, repeat: -1, ease: "none", stagger: 1.3, motionPath: { path: p, align: p, alignOrigin: [.5, .5] } });
  }, { scope: flow });

  useEffect(() => {
    if (!gauge.current) return;
    const len = 2 * Math.PI * 88;
    gsap.to(gauge.current, { strokeDashoffset: len - (score / 100) * len, duration: .8, ease: "power3.out" });
  }, [score]);

  const toggle = (id: string) => setOn((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const len = 2 * Math.PI * 88;

  return (
    <div ref={root} className="cb-root" data-tool="cofre-fantasma">
      <StaticField level={score} />
      <header className="cb-hero cb-plate">
        <p className="cb-kicker"><Ghost size={14} className="cf-ghost" /> Simulador de custódia air-gapped</p>
        <h1 className="cb-title"><span>Cofre</span> <span>Fantasma</span></h1>
        <p className="cb-muted cb-lead">
          Uma chave que nunca toca a rede não pode ser roubada pela rede. Monte as barreiras do seu assinador offline,
          veja o ruído de rádio sumir do fundo e entenda o caminho exato que uma transação percorre sem expor a chave.
        </p>
        <p className="cb-note">Ferramenta educacional. Nenhuma chave é gerada, guardada ou enviada.</p>
        <ToolGuide
          defaultOpen={false}
          purpose="Air-gapped significa separado por ar: o aparelho que guarda e usa a chave fica fisicamente desconectado de qualquer rede. Esta página ajuda a medir o quão isolado está o seu método e mostra como assinar sem quebrar esse isolamento."
          steps={[
            { title: "Marque suas barreiras", text: "No painel de isolamento, ative apenas o que você realmente faz hoje. O medidor e o fundo reagem na hora." },
            { title: "Teste o coletor", text: "Desenhe no quadro para ver como movimentos aleatórios viram entropia. É uma demonstração, não uma semente." },
            { title: "Siga o fluxo", text: "O diagrama mostra o percurso de uma transação entre o computador online e o assinador offline." },
          ]}
          legend={[
            { label: "Cofre fantasma:", text: "85 pontos ou mais.", tone: "ok" },
            { label: "Isolamento parcial:", text: "entre 55 e 84.", tone: "mid" },
            { label: "Chave exposta:", text: "abaixo de 55.", tone: "warn" },
          ]}
        />
      </header>

      <section className="cf-grid">
        <div className="cb-plate cb-reveal">
          <p className="cb-kicker">Barreiras de isolamento</p>
          <ul className="cf-barriers">
            {BARRIERS.map((b) => (
              <li key={b.id}>
                <Button variant="unstyled" aria-pressed={on.has(b.id)} className={on.has(b.id) ? "on" : ""} onClick={() => toggle(b.id)}>
                  <span className="cf-dot" />
                  <span><strong>{b.label}</strong><small>{b.detail}</small></span>
                  <b>+{b.weight}</b>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="cb-plate cf-gauge-wrap cb-reveal">
          <svg viewBox="0 0 220 220" className="cf-gauge" role="img" aria-label={`Isolamento ${score} de 100`}>
            <circle cx="110" cy="110" r="88" className="cf-track" />
            <circle ref={gauge} cx="110" cy="110" r="88" className={`cf-arc ${score >= 85 ? "ok" : score >= 55 ? "mid" : "bad"}`}
              strokeDasharray={len} strokeDashoffset={len} transform="rotate(-90 110 110)" />
            <text x="110" y="112" textAnchor="middle" className="cf-gauge-n">{score}</text>
            <text x="110" y="138" textAnchor="middle" className="cf-gauge-l">ISOLAMENTO</text>
          </svg>
          <div className={`cb-verdict ${score >= 85 ? "v-blindado" : score >= 55 ? "v-atencao" : "v-perdido"}`} aria-live="polite">
            {score >= 85 ? <ShieldCheck size={22} /> : <ShieldAlert size={22} />}
            <div><strong>{v.t}</strong><span>{v.d}</span></div>
          </div>
        </div>

        <EntropyPad />
      </section>

      <section className="cb-plate cb-reveal">
        <p className="cb-kicker"><QrCode size={14} /> Percurso de uma assinatura offline</p>
        <svg ref={flow} viewBox="0 0 1000 120" className="cf-flow" aria-hidden>
          <path id="cf-flow-path" d="M60,60 C200,0 300,120 500,60 S800,0 940,60" className="cf-flow-line" />
          {[0, 1, 2].map((i) => <circle key={i} r="6" className="cf-packet" />)}
        </svg>
        <ol className="cf-steps">
          {FLOW.map((f, i) => (
            <li key={f.id} className={f.id === "offline" ? "core" : ""}>
              <f.icon size={18} /><span className="cf-num">{String(i + 1).padStart(2, "0")}</span>
              <strong>{f.t}</strong><small>{f.d}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="cb-doctrine">
        {[
          { t: "O que atravessa", d: "Só a transação não assinada vai e só a assinatura volta. A semente e a chave privada nunca saem do assinador." },
          { t: "Onde costuma falhar", d: "Conectar o assinador por USB para atualizar, fotografar a semente com o celular ou digitá-la num computador para testar." },
          { t: "Equipamentos de referência", d: "Assinadores com câmera e cartão SD, como Coldcard, Keystone, Jade em modo QR ou SeedSigner, permitem esse fluxo." },
        ].map((c) => (
          <article key={c.t} className="cb-plate cb-reveal"><Ghost size={20} className="cb-gold" /><h3>{c.t}</h3><p className="cb-muted">{c.d}</p></article>
        ))}
      </section>
    </div>
  );
}
