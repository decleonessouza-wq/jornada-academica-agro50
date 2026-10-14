# Jornada Acadêmica AGRO 5.0 — protótipo de hotsite

**Computação sem Fronteiras na Engenharia do Campo**

Versão institucional atualizada em 14/10/2026 com base no briefing, na identificação do UniSENAI MT — Rondonópolis e na confirmação do local de realização das atividades presenciais. Não é um site oficial publicado, não substitui a página da Even3 e não utiliza marcas de terceiros como se houvesse aprovação formal.

## Instituição acadêmica confirmada

- Nome público: **UniSENAI MT — Centro Universitário SENAI MT**, unidade **Rondonópolis (MT)**.
- Endereço cadastral da unidade, conforme site institucional: **Rua Ademir de Jesus Ribeiro, 3147, Parque Universitário, Rondonópolis/MT**.
- **Local confirmado das atividades presenciais:** esta unidade UniSENAI MT no endereço informado. **Salas e laboratório específicos permanecem pendentes** de confirmação pela organização.
- Site institucional: https://unisenaimt.com.br/
- A imagem enviada é uma captura de um boletim institucional, **não um arquivo oficial de logotipo utilizável no site**.
- A faixa discreta azul/laranja é uma referência cromática provisória e será substituída/reconciliada com a identidade preparada pela comissão de design.

## Como visualizar no Windows / VS Code

1. Extraia o arquivo ZIP para uma pasta de projeto.
2. Abra a pasta no VS Code.
3. Abra `index.html` no navegador, ou utilize uma extensão de servidor local como *Live Server*.
4. A navegação tem três páginas e funciona sem instalação de dependências.

## Arquivos

- `index.html` — apresentação da Jornada e destaques.
- `programacao.html` — programação cronológica, filtros por mês e perguntas frequentes.
- `altus.html` — página especial BluePlant, conteúdos, datas e requisitos.
- `assets/style.css` — paleta, tipografia e estilos responsivos.
- `assets/main.js` — menu no celular e filtros da programação.
- `assets/favicon.svg` — símbolo **provisório**, não oficial.
- `CHECKLIST_PUBLICACAO.md` — dados pendentes e validação antes de colocar no ar.

## Convenções de conteúdo

- As três datas do BluePlant são: **28/10**, **04/11** e **02/12/2026**, das 19h às 22h.
- Em 28/10 e 04/11: Google Meet, vagas ilimitadas, conforme informação da comissão.
- Em 02/12: etapa presencial no laboratório, 40 vagas. Exige participação/conclusão das duas noites online. A elegibilidade não assegura automaticamente uma vaga: seleção e eventual ordem de inscrição dependem de confirmação oficial.
- O dia 30/10 tem duas atividades anunciadas no mesmo intervalo (19h–22h). Não presumimos que uma delas tenha sido remarcada.
- O campus de todas as atividades presenciais foi confirmado. As modalidades individuais e as salas dos minicursos **não foram especificadas** no briefing; continuam pendentes.
- "Treinamento Nathan" mantém o nome originalmente fornecido, mas requer confirmação do tema e do instrutor.
- A data do minicurso Lean Manufacturing está pendente.
- Não exibir nomes e atribuições das comissões internas nas páginas públicas sem autorização.
- Não afirmar patrocínio, endosso ou participação institucional da Altus enquanto isso não estiver formalmente confirmado.

## Arquitetura e integração com os responsáveis

O projeto estático é uma proposta visual independente, destinada à validação. A identidade e a home são **pré-projeto ilustrativo**: a versão final deve incorporar a identidade oficial elaborada por Lucas Martins. As páginas `programacao.html` e `altus.html` são os módulos que podem ser integrados ao site definitivo sob responsabilidade de Decleones. O link Even3 deverá ser fornecido pela comissão de inscrições, sob responsabilidade de Esdras.

## Boas práticas já presentes

- Layout responsivo, menu acessível, foco visível e respeito ao modo de movimento reduzido.
- SEO básico: título, resumo da página, idioma e metadados Open Graph sem URLs fictícias.
- Sem coleta de dados pessoais e sem formulários paralelos à Even3.
- Textos técnicos baseados na documentação da fabricante e na proposta enviada pelos organizadores.
- Informações pendentes não são tratadas como confirmadas.

## Antes da publicação

Não adicionar Event/JSON-LD completo enquanto local, organizador, URL oficial e critérios de inscrição não estiverem definidos. O Google recomenda URLs próprias com nome, data e localização corretos para dados estruturados de eventos.

### Referências técnicas

- BluePlant Altus: https://www.altus.com.br/serie/scada-blueplant/
- Recursos MQTT/OPC UA: https://www.altus.com.br/post/346/blueplant-alta-conectividade-para-supervisao-de-processos-na-industria-4-0/
- Even3: https://www.even3.com.br/plataforma
- Google Event structured data: https://developers.google.com/search/docs/appearance/structured-data/event
- WCAG 2.2: https://www.w3.org/WAI/standards-guidelines/wcag/
