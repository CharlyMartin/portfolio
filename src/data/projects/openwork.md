---
title: OpenWork
description: The description of the project
---

## Context

OpenWork is one of the leading payroll companies in France. They help contractors with administrative tasks and help companies work more flexibly. They went through a complete code rewrite and rebranding during the COVID-19 pandemic as the work landscape changed.

## Contribution

I build parts of the front-end application: the blog, different contact forms with AJAX handling, and the [salary simulator](https://www.openwork.co/fr/simulez-votre-salaire-en-portage-salarial). The latter was a fun challenge. The formulas behind the simulator were provided in Excel format, such as `VAR1 = SUM(VAR_2, VAR_3)`. The client wanted to keep this format so they could easily change formulas in the CMS we built for them.

I had to map the formula variables to the form inputs and parse the Excel formulas to JavaScript to dynamically calculate the results. The [hot-formula-parser](https://www.npmjs.com/package/hot-formula-parser) package came in really handy!
