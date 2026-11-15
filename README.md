<div align="center">

<img src="./public/og-cover.svg" width="100%" alt="Cofre Fantasma — LORD JUNNIOR" />

# COFRE FANTASMA

**Meça o isolamento do seu assinador offline, gere entropia com o próprio gesto e veja o percurso de uma assinatura que nunca toca a rede.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=111)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=fff)](https://vite.dev/)

[Site oficial](https://lordjunnior.com.br/ferramentas/cofre-fantasma) · [Perfil GitHub](https://github.com/lordjunnior)

</div>

---

## Visão geral

Meça o isolamento do seu assinador offline, gere entropia com o próprio gesto e veja o percurso de uma assinatura que nunca toca a rede.

Este repositório contém uma versão independente da ferramenta publicada no Arsenal LORD JUNNIOR. A interface e os módulos locais necessários foram extraídos do projeto principal para permitir execução, auditoria e evolução separadas.

## Executar localmente

Requisitos: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run build
npm run preview
```

## Arquitetura

- `src/App.tsx`: entrada independente da ferramenta.
- `src/components/tools/screens/`: tela funcional e componentes diretamente necessários.
- `src/components/tools/lib/` e `src/lib/`: motores e cálculos reutilizados pela tela, quando aplicável.
- `src/styles.css`: tokens visuais e estilos compartilhados da família LORD JUNNIOR.

## Privacidade e integrações

A ferramenta preserva o fluxo de processamento implementado na tela de origem. Quando houver chamadas a serviços externos, elas devem ser avaliadas conforme o provedor e a ação executada; ausência de conta própria não significa ausência de tráfego externo. Não inclua chaves privadas, tokens ou credenciais no código do navegador.

## Projeto de origem

- Site: https://lordjunnior.com.br
- Código-fonte principal: https://github.com/lordjunnior/Meu-site-atualizado
- Ferramenta no site: `/ferramentas/cofre-fantasma`

---

**LORD JUNNIOR** — Inteligência, Geopolítica e Liberdade Digital.

## Documentação complementar

O material original do repositório foi preservado em `manuais/`. A versão anterior do README está arquivada em `docs/README-legacy.md`.
