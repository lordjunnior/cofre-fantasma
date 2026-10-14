# cofre-fantasma

> Manual definitivo para transformar hardware acessivel e descartavel em um cofre de Bitcoin 100% isolado da internet (Air-Gap).

---

## Proposta

Guardar patrimonio em corretoras ou computadores conectados a internet expoe seus fundos a invasores, malwares e riscos de apreensao. Carteiras de marca comerciais costumam ser caras, dependem de programas fechados e utilizam cabos USB que criam caminhos de ataque.

O projeto **cofre-fantasma** ensina a montar seu proprio cofre fisico independente usando pecas acessiveis de prateleira, sem fios e sem internet:

* **Blindagem total (Air-Gap):** O aparelho nunca encosta em redes Wi-Fi, sinal de celular, Bluetooth ou cabo de dados. A troca de informacoes ocorre exclusivamente por leitura visual de codigos QR na tela e na camera.
* **Amnesia operacional:** O sistema opera na memoria RAM volatil. Ao desligar a bateria ou cortar a energia, todos os dados da sessao somem na hora.
* **Componentes neutros:** Montado com placas acessiveis de visao computacional, sem depender de fabricantes tradicionais de hardware wallets.

---

## Estrutura do Repositorio

```text
cofre-fantasma/
├── README.md
└── manuais/
    ├── 01-isolamento-total-airgap.md
    ├── 02-montagem-e-preparacao.md
    ├── 03-criacao-de-chaves-com-dados.md
    ├── 04-senhas-e-criptografia-local.md
    ├── 05-divisao-matematica-da-semente.md
    └── 06-backup-em-aco-e-recuperacao.md