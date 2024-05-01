---
inject: true
to: <%= path %>/<%= exportFile %>
before: \#hygen-jaypie-model-new
skip_if: '<%= Name %>: () => model'
---
    <%= Name %>: () => model("<%= name %>", <%= name %>Schema),