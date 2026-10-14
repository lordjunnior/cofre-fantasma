---
titulo: "Isolamento Total (Air-Gap): O que e e Como Funciona"
descricao: "Entenda a barreira fisica definitiva contra invasores e como assinar transacoes usando apenas a camera e a tela."
---

# Isolamento Total (Air-Gap): A Barreira Fisica Definitiva

O termo Air-Gap (vão de ar) define um sistema computacional que nao possui nenhuma conexao fisica ou sem fio com redes externas[cite: 8]. Isso significa:
* Sem Wi-Fi[cite: 8].
* Sem Bluetooth[cite: 8].
* Sem sinal de celular (GSM/LTE/5G).
* Sem transmissao de dados por cabo USB[cite: 8].

Ao eliminar qualquer canal eletrico ou eletromagnetico, torna-se matematicamente impossivel para um hacker invadir seu dispositivo pela internet ou instalar malwares a distancia.

---

## 1. Por que Cabos USB Sao um Risco Real?

Muitas carteiras de hardware comerciais anunciam seguranca extrema, mas exigem conexao direta via cabo USB ao computador ou celular.

Essa abordagem traz tres fraquezas estruturais:
1. Ataques BadUSB: O computador infectado pode tentar enviar comandos maliciosos ou exploracoes de firmware pela porta USB.
2. Roubo de chaves por malware: Se o microcontrolador da carteira tiver vulnerabilidades de isolamento, um software invasor na maquina pode tentar extrair chaves privadas.
3. Dependencia de drivers proprietarios: Voce fica preso ao ecossistema e aos aplicativos oficiais do fabricante para conseguir assinar operacoes.

O cofre isolado por Air-Gap trata o computador conectado como um ambiente hostil: nada entra e nada sai por fiaçao de dados[cite: 8].

---

## 2. A Linguagem Visual: Codigos QR

Sem fios e sem radio, a comunicacao entre o computador (onde esta sua carteira de visualizacao) e o seu cofre ocorre exclusivamente pelo canal otico[cite: 8]:

* A camera do cofre funciona como o receptor de dados[cite: 8].
* A tela do cofre funciona como o transmissor de dados[cite: 8].

Para transmitir informacoes maiores que cabem em uma unica imagem estatica, o protocolo utiliza Codigos QR Animados (como o padrao UR / Animated QR)[cite: 8]. O dispositivo le e exibe uma sequencia de quadros em alta velocidade, transportando blocos de dados completos sem nenhum contato fisico[cite: 8].

---

## 3. O Fluxo de Assinatura de Transacoes (PSBT)

A assinatura de uma transacao de Bitcoin em um cofre Air-Gap segue o padrao auditado BIP-174 (Partially Signed Bitcoin Transactions - Transacoes de Bitcoin Parcialmente Assinadas)[cite: 8].

O passo a passo operacional funciona assim:

1. Criacao da Transacao (no Computador):
   * Em uma carteira de coordenacao (como Sparrow Wallet ou BlueWallet), voce monta o pagamento informando o destino e a taxa.
   * A carteira gera a transacao ainda sem assinatura (PSBT) e a exibe na tela do computador como um QR Code animado.

2. Leitura e Validacao (no Cofre-Fantasma):
   * Voce aponta a camera do cofre para a tela do computador[cite: 8].
   * O cofre decodifica a transacao e exibe na sua propria tela as informacoes criticas: endereco de destino, valor exato e taxa de rede cobrada[cite: 8].
   * Voce confere se o endereco na tela do cofre bate exatamente com o destinatario real.

3. Assinatura Local:
   * Ao confirmar os dados no aparelho, o processador assina os blocos com sua chave secreta[cite: 8].
   * A chave privada nunca sai da memoria interna do dispositivo[cite: 8].

4. Transmissao de Volta (para a Rede):
   * O cofre gera na propria tela o QR Code animado contendo a transacao assinada[cite: 8].
   * Voce usa a webcam do computador ou a camera do celular para ler a tela do cofre[cite: 8].
   * O computador recebe a transacao assinada e a transmite para a rede Bitcoin[cite: 8].

---

## 4. Amnesia Operacional e Memoria RAM

Dispositivos que guardam chaves gravadas em chips permanentes estao sempre sob risco de perda fisica: se alguem roubar o aparelho, pode tentar ataques fisicos de desmonte em laboratorio para ler o chip.

No modelo de cofre-fantasma, a melhor pratica e o modo amnesico:
* Voce digita ou escaneia suas palavras secretas no inicio da sessao[cite: 8].
* Elas residem temporariamente na memoria RAM volátil[cite: 8].
* Apos assinar sua transacao, ao desligar o aparelho da energia, a memoria RAM perde a carga eletrica e o segredo e destruido na hora[cite: 8].
* Se o aparelho for apreendido ou roubado no minuto seguinte, ele e apenas um pedaco de plastico inofensivo sem dados gravados[cite: 8].