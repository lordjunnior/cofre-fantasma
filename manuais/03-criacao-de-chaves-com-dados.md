---
titulo: "Criacao de Chaves com Dados Fisicos: Entropia Pura"
descricao: "Como gerar palavras-semente BIP-39 usando dados de jogo comuns para eliminar a dependencia de geradores eletronicos."
---

# Criacao de Chaves com Dados Fisicos: Entropia Pura

A seguranca de uma carteira de Bitcoin depende exclusivamente da aleatoriedade (entropia) usada para gerar suas palavras secretas. Se o processo de geracao for previsivel, qualquer invasor podera recriar sua carteira e esvaziar seus fundos.

Geradores eletronicos de numeros aleatorios (TRNGs) integrados em processadores comerciais funcionam como caixas-pretas: e impossivel para o usuario comum auditar visualmente se o chip possui falhas de fabrica ou portas dos fundos embutidas.

Com dados fisicos comuns de jogo (D6 ou D20), a aleatoriedade e garantida pelas leis da fisica e auditada diante dos seus proprios olhos.

---

## 1. Quantas Rolagens Sao Necessarias?

O padrao da industria (BIP-39) exige uma quantidade minima de bits de aleatoriedade:

* **Carteiras de 12 palavras:** Exigem 128 bits de entropia.
* **Carteiras de 24 palavras:** Exigem 256 bits de entropia.

Cada rolagem de dado tradicional de 6 faces (D6) fornece aproximadamente 2,58 bits de informacao matematica.

| Tipo de Dado | Tamanho da Chave | Quantidade Minima de Rolagens |
| :--- | :--- | :--- |
| **Dado Comum (D6)** | 12 Palavras (128 bits) | **50 rolagens** |
| **Dado Comum (D6)** | 24 Palavras (256 bits) | **100 rolagens** |
| **Dado de RPG (D20)** | 12 Palavras (128 bits) | **30 rolagens** |
| **Dado de RPG (D20)** | 24 Palavras (256 bits) | **60 rolagens** |

---

## 2. Preparacao do Ambiente de Rolagem

Para garantir que o resultado nao sofra vies mecanico:
1. Use um copo opaco para chacoalhar os dados antes de jogar.
2. Jogue sobre uma superficie macia ou bandeja para evitar que o dado deslize sem girar.
3. Se o dado cair inclinado, no chao ou sobre outro dado, desconsidere e jogue novamente.
4. Nunca use aplicativos de rolar dados no celular ou computador, pois isso anula todo o isolamento de seguranca.

---

## 3. Passo a Passo no Cofre-Fantasma

1. Ligue o aparelho e selecione a opcao de criacao de chave no menu principal.
2. Escolha o metodo de entrada: **Dados (Dice)**.
3. Defina se deseja gerar **12 palavras** ou **24 palavras**.
4. Selecione o tipo de dado utilizado: **D6** ou **D20**.
5. O sistema exibira um contador na tela (ex: `0 / 50` ou `0 / 100`).
6. A cada rolagem fisica na mesa, digite o numero correspondente usando os botoes ou o toque na tela.
7. Apos a ultima rolagem, o processador calcula a dispersao criptografica (SHA-256) sobre os dados coletados.

---

## 4. O Calculo do Checksum da Ultima Palavra

Um erro comum de iniciantes e tentar sortear todas as palavras do dicionario BIP-39 usando dados uma a uma manualmente.

Isso falha porque a ultima palavra (a 12ª ou a 24ª) nao e aleatoria: ela contem um digito verificador matematico chamado **Checksum**.

* Em 12 palavras, os ultimos 4 bits da 12ª palavra sao calculados a partir das anteriores.
* Em 24 palavras, os ultimos 8 bits da 24ª palavra sao o hash verificador do conjunto.

O cofre-fantasma faz esse calculo automaticamente: ele absorve as rolagens dos dados brutos, deriva o checksum exato e entrega as palavras perfeitamente validas na tela.

---

## 5. Modo Hibrido: Entropia Otica pela Camera

Caso queira uma camada extra de aleatoriedade combinada aos dados, o sistema permite usar o proprio sensor da camera:

* A camera captura o ruido microscopico de iluminacao e textura do ambiente (ruido termico do sensor CMOS).
* Esses pixels sao combinados matematicamente com as rolagens dos seus dados fisicos.
* Mesmo que seus dados fossem imperfeitos ou tivessem pequenas imperfeicoes de peso, a combinacao com a leitura da camera garante imprevisibilidade absoluta.

Apos o processamento, anote as palavras exibidas na tela em ordem numerica rigorosa. Nunca tire foto da tela com celular nem guarde esses dados em bloco de notas de computador.