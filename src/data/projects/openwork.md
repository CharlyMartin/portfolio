---
title: OpenWork
description: The description of the project
---

## Context

OpenWork is one of the leading payroll companies in France. They help contractors with administrative tasks and help companies work more flexibly. They went through a complete code rewrite and rebranding during the COVID-19 pandemic as the work landscape changed.

## Contribution

I build parts of the front-end application: the blog, different contact forms with AJAX handling, and the [salary simulator](https://www.openwork.co/fr/simulez-votre-salaire-en-portage-salarial). The latter was a fun challenge. The formulas behind the simulator were provided in Excel format, such as `VAR1 = SUM(VAR_2, VAR_3)`. The client wanted to keep this format so they could easily change formulas in the CMS we built for them.

I also helped with performance improvements. Their web app was built with a legacy version of Next.js. I upgraded the codebase to v11, the latest version of Next at the time. It was quite a challenge, given the number of templates and pages. My team and I implemented caching strategies, code splitting, and lazy loading to improve the app's overall performance.

## Results

We managed to trim down the bundle size by 40% and improve the Lighthouse score by 20 points. The client was pleased with the results and the new design. They were able to launch their new brand and website on time.
