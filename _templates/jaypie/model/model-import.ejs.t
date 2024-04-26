---
inject: true
to: express/models/index.js
before: \#hygen-velm-model-import
skip_if: 'import <%= name %>Schema'
---
import <%= name %>Schema from "./<%= name %>.schema.js";