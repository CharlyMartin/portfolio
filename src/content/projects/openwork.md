---
title: OpenWork
description: "The payroll company that protects freelancers anywhere."
hq: "Paris, France"
logo:
  src: /images/projects/openwork-logo.webp
  style:
    padding: "10px"
images:
  - /images/projects/openwork-1.webp
dates:
  start: "2020-04"
  end: "2021-04"
url: "https://www.openwork.fr/"
display: true
highlight: false
roles:
  - "roles/frontend.json"
stack:
  - "tools/typescript.json"
  - "tools/next.json"
  - "tools/graphql.json"
  - "tools/mapbox-sdk.json"
  - "tools/intercom-sdk.json"
  - "tools/react-hook-form.json"
people:
  - slug: "people/gautier-roquancourt.json"
    role:
      slug: "roles/ui-design.json"
  - slug: "people/louis-roufinaud.json"
    role:
      slug: "roles/eng-management.json"
  - slug: "people/gwenaelle-thouseau.json"
    role:
      slug: "roles/backend.json"
  - slug: "people/adrien-rahier.json"
    role:
      slug: "roles/frontend.json"
  - slug: "people/isabella-brookes.json"
    role:
      slug: "roles/frontend.json"
status: live
area: web2
employment: contract
---

OpenWork is one of the leading payroll companies in France. They help contractors with administrative tasks and help companies work more flexibly. They went through a complete code rewrite and rebranding during the COVID-19 pandemic as the work landscape changed.

I built parts of the front-end application: the blog, different contact forms with AJAX handling, and the [salary simulator](https://www.openwork.co/fr/simulez-votre-salaire-en-portage-salarial). The latter was a fun challenge. The formulas behind the simulator were provided in Excel format, such as `VAR1 = SUM(VAR_2, VAR_3)`. The client wanted to keep this format so they could easily change formulas in the CMS we built for them.

I also helped with performance improvements. Their web app was built with a legacy version of Next.js. I upgraded the codebase to v11, the latest version of Next at the time. It was quite a challenge, given the number of templates and pages. My team and I implemented caching strategies, code splitting, and lazy loading to improve the app's overall performance.

Altogether, we managed to trim down the bundle size by 40% and improve the Lighthouse score by 20 points. The client was pleased with the results and the new design. They were able to launch their new brand and website on time.
