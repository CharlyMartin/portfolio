---
title: OpenWork
description: The description of the project
---

## Context

OpenWork is one of the leading payroll companies in France. They help contractors with their administrative tasks, and help companies work more flexibly. They went through a complete code rewrite and rebranding during CoVid, as the landscape of work was changing.

## Contribution

I build parts of the front-end application: the blog, different contact forms with AJAX handling and the [salary simulator](https://www.openwork.co/fr/simulez-votre-salaire-en-portage-salarial). The latter was a fun challenge. The formulas behind the simulator were written in Excel format, such as `TOTAL = SUM(VAR_1, VAR_2)`. I had to map the formula variables to the form inputs, and parse the Excel formulas to JavaScript to dynamically calculate the results. The [hot-formula-parser](https://www.npmjs.com/package/hot-formula-parser) package came in really handy!
