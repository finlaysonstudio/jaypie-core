---
inject: true
to: express/models/index.js
before: \#hygen-velm-model-new
skip_if: '<%= Name %>: () => model'
---
    <%= Name %>: () => model("<%= name %>", <%= name %>Schema),