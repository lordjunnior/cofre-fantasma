import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, ChevronDown } from "lucide-react";
import "./tool-guide.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface GuideStep { title: string; text: string }
interface Props {
  purpose: string;
  steps: GuideStep[];
  legend?: { label: string; text: string; tone?: "ok" | "mid" | "warn" }[];
  defaultOpen?: boolean;
}

/** Guia rápido para leitores leigos: para que serve, passo a passo e legenda. */
export function ToolGuide({ purpose, steps, legend, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const body = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!open || !body.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(body.current.querySelectorAll(".tg-step, .tg-legend li"), {
      y: 24, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
    });
  }, { dependencies: [open], scope: body });

  return (
    <section className="tg-root" aria-label="Como usar esta ferramenta">
      <Button variant="unstyled" type="button" className="tg-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <BookOpen size={16} />
        <span>Como usar e para que serve</span>
        <ChevronDown size={16} className={open ? "tg-rot" : ""} />
      </Button>
      {open && (
        <div ref={body} className="tg-body">
          <p className="tg-purpose">{purpose}</p>
          <ol className="tg-steps">
            {steps.map((s, i) => (
              <li key={s.title} className="tg-step">
                <span className="tg-num">{String(i + 1).padStart(2, "0")}</span>
                <div><strong>{s.title}</strong><p>{s.text}</p></div>
              </li>
            ))}
          </ol>
          {legend && (
            <ul className="tg-legend">
              {legend.map((l) => (
                <li key={l.label} className={l.tone ?? "mid"}><b>{l.label}</b> <span>{l.text}</span></li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

/** Entrada animada das placas ao rolar, no mesmo padrão do Chave Blindada. */
export function usePlateReveal(selector: string) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.utils.toArray<HTMLElement>(selector).forEach((el) =>
      gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
  }, { scope });
  return scope;
}
