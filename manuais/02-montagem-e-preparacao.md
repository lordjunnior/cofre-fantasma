---
titulo: "Montagem e Preparacao do Hardware"
descricao: "Escolha das placas compativeis, gravacao limpa do sistema e verificacao criptografica de autenticidade."
---

# Montagem e Preparacao do Hardware

Diferente de carteiras comerciais proprietarias que chegam pelo correio com embalagens chamativas e custos elevados, o cofre-fantasma utiliza microcontroladores de visao computacional de prateleira baseados no chip Kendryte K210.

Vantagens dessa abordagem:
* Custo acessivel: Placas genericas de desenvolvimento custam uma fracao de uma carteira de marca.
* Imunidade contra interceptacao direcionada: Ninguem nos correios ou na alfandega sabe que a placa sera usada para guardar Bitcoin.
* Neutralidade: O aparelho e apenas um modulo de camera e tela sem ligacao previa com redes financeiras.

---

## 1. Dispositivos Compativeis Recomendados

Os modelos mais populares e testados para operacao autonoma sao:

* **M5Stack M5StickV:** O mais compacto e discreto. Possui tela pequena de 1.14 polegadas, camera frontal, bateria interna e botoes fisicos.
* **Sipeed Maix Amigo:** Modelo robusto com tela sensivel ao toque de 3.5 polegadas, cameras frontal e traseira, corpo fechado e bateria integrada de maior duracao.
* **Sipeed Maix Bit / Dock:** Placas abertas ideais para estudo em bancada, exigindo fonte de alimentacao externa via cabo USB apenas para forca eletrica.
* **Yahboom K210:** Placa de desenvolvimento compacta com tela e camera integradas.

---

## 2. Verificacao de Integridade dos Arquivos

Nunca grave nenhum sistema no seu aparelho sem antes verificar se o arquivo baixado nao foi adulterado no caminho.

1. Baixe o arquivo binario do firmware (`.bin` ou `.kfpkg`).
2. Baixe o arquivo de soma de verificacao (`SHA256SUMS`) e a assinatura PGP correspondente (`.sig` ou `.asc`).
3. No terminal, valide a assinatura oficial do desenvolvedor:
   ```bash
   gpg --verify SHA256SUMS.sig SHA256SUMS