---
titulo: "Senhas, Frase Secreta e Criptografia Local"
descricao: "Como usar palavras-passe adicionais (BIP-39 Passphrase) e como proteger sementes no cartao MicroSD com criptografia resistente a forca bruta."
---

# Senhas, Frase Secreta e Criptografia Local

Possuir as 12 ou 24 palavras-semente da sua carteira e fundamental, mas expor essas palavras sem nenhuma camada complementar cria um risco imediato: qualquer pessoa que veja suas anotacoes fisicas pode roubar seus fundos.

Para solucionar isso, existem duas camadas independentes de protecao por senha no cofre-fantasma:
1. **Palavra-passe BIP-39 (Passphrase):** Uma protecao matematica que altera a raiz da carteira.
2. **Criptografia Local do Cofre (KEF):** Um metodo para guardar sua chave no cartao MicroSD de forma cifrada.

---

## 1. A 13ª ou 25ª Palavra: BIP-39 Passphrase

A palavra-passe (frequentemente chamada de "25ª palavra" em sementes de 24 palavras) nao faz parte da lista oficial BIP-39. Ela e uma palavra ou frase arbitrária criada por voce.

### Como Funciona na Pratica
* Suas 12 ou 24 palavras servem como a base matematica.
* Ao digitar uma passphrase qualquer, o processador combina a semente com essa frase e gera uma carteira completamente diferente.
* Se voce mudar uma unica letra (maiuscula ou minuscula), uma nova carteira inteira com saldo zero sera gerada.

### O Poder da Negacao Plausivel
Se voce for coagido fisicamente ou sofrer um assalto:
* Voce pode entregar a semente pura (as 24 palavras sem senha) ou com uma senha de chamariz, contendo apenas uma pequena fracao do seu patrimonio.
* O invasor nao tem como provar que existe outra conta com senha oculta derivada daquelas mesmas palavras.
* Sua carteira real fica protegida pela sua senha mestre memorizada.

**Aviso Critico:** Nao existe recuperacao de senha. Se esquecer a sua Passphrase, nem mesmo com as 24 palavras sera possivel movimentar os fundos.

---

## 2. Guardando Chaves Cifradas no MicroSD (Formato KEF)

Se voce nao quiser digitar todas as palavras na tela a cada operacao, pode gravar sua chave dentro do cartao MicroSD de forma protegida pelo padrao KEF (Krux Encryption Format).

### A Arquitetura de Cifra
* **Derivacao de chave:** O sistema usa PBKDF2 com milhares de iteracoes sobre a sua senha para retardar ataques de forca bruta em computadores potentes.
* **Algoritmo de cifra:** Seus dados sao cifrados usando AES-CBC ou ChaCha20.
* **Segredo em disco:** O arquivo gravado no MicroSD contem apenas blocos ilegiveis de dados cifrados.

Mesmo que o cartao de memoria seja colocado em um leitor de computador comum, nenhum arquivo legivel sera exibido sem a senha mestra.

---

## 3. Passo a Passo para Cifrar e Salvar

1. Carregue ou crie sua semente no cofre.
2. No menu de gerenciamento de chaves, selecione **Salvar Chave Cifrada**.
3. Defina um apelido para a chave (para facil identificacao na tela).
4. Digite uma senha mestre forte diretamente no teclado do aparelho.
5. O cofre processa a derivacao matematica e grava o arquivo criptografado no cartao MicroSD.
6. Ao reiniciar o aparelho, a memoria RAM estara limpa. Para usar a carteira novamente, basta selecionar o arquivo no menu e digitar a senha.

---

## 4. Politica de Senhas para Protecao de Longo Prazo

Ao definir senhas para cofres fisicos e passphrases, siga tres regras:
* **Comprimento supera complexidade:** Uma sequencia de 5 ou 6 palavras comuns aleatorias (metodo Diceware) e muito mais segura e facil de lembrar do que codigos curtos cheios de simbolos confusos.
* **Distribuicao geografica:** Nunca guarde a sua senha escrita no mesmo comodo ou na mesma casa onde esta o backup das suas palavras-chave.
* **Sem pistas obvias:** Evite datas de aniversario, nomes de familiares, placas de carro ou sequencias numericas basicas.