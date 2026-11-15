/** Lógica do Cofre Fantasma: pontuação de isolamento e estimativa de entropia coletada. */
export interface Barrier { id: string; label: string; detail: string; weight: number }

export const BARRIERS: Barrier[] = [
  { id: "wifi", label: "Sem Wi-Fi nem Bluetooth", detail: "Rádios removidos ou desativados no hardware, não apenas no software.", weight: 20 },
  { id: "nunca", label: "Nunca conectado à internet", detail: "O aparelho de assinatura jamais tocou uma rede desde a geração da semente.", weight: 20 },
  { id: "qr", label: "Transferência só por QR ou cartão SD", detail: "Nada de cabo USB com dados entre o computador online e o assinador.", weight: 15 },
  { id: "fonte", label: "Firmware verificado", detail: "Assinatura do firmware conferida antes da instalação.", weight: 15 },
  { id: "dados", label: "Dados físicos para a semente", detail: "Entropia gerada por dados ou moeda, não só pelo aparelho.", weight: 10 },
  { id: "verifica", label: "Endereço conferido na tela do assinador", detail: "Destino e valor lidos na tela do aparelho offline antes de assinar.", weight: 10 },
  { id: "faraday", label: "Guarda em bolsa de Faraday", detail: "Proteção contra rádio e acesso casual quando o aparelho está guardado.", weight: 5 },
  { id: "backup", label: "Backup da semente em metal, fora de casa", detail: "Cópia resistente a fogo em local separado.", weight: 5 },
];

export function isolationScore(on: Set<string>): number {
  return BARRIERS.reduce((s, b) => s + (on.has(b.id) ? b.weight : 0), 0);
}

export function isolationVerdict(score: number) {
  if (score >= 85) return { t: "Cofre fantasma", d: "Isolamento de nível profissional. A chave não tem caminho até a rede." };
  if (score >= 55) return { t: "Isolamento parcial", d: "Barreiras importantes no lugar, mas ainda existem pontes possíveis." };
  return { t: "Chave exposta", d: "O assinador ainda se comporta como uma carteira quente." };
}

/** Bits estimados a partir de amostras de movimento: no máximo 2 bits por amostra, teto 256. */
export function entropyBits(samples: number): number {
  return Math.min(256, Math.floor(samples * 2));
}
