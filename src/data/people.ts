import type { People } from "@/types";

const data: Array<People> = [
  {
    id: 1,
    name: "André Navarre",
    description: "TODO",
    url: "https://andrenavarre.com/",
    skills: [10, 4],
  },
  {
    id: 2,
    name: "Alexis Doreau",
    description: "TODO",
    url: "https://alexisdoreau.com/",
    skills: [4, 5, 8],
  },
  {
    id: 3,
    name: "Jérémy Marcillaud",
    description: "TODO",
    url: "https://www.linkedin.com/in/jeremy-marcillaud/",
    skills: [1, 2],
  },
  {
    id: 4,
    name: "Steven Bowen",
    description: "TODO",
    url: "https://www.linkedin.com/in/sdbowen/",
    skills: [1, 2, 3, 6, 7],
  },
  {
    id: 5,
    name: "Richard Kaufman-López",
    description: "TODO",
    url: "https://www.linkedin.com/in/richard-b-kaufman-lopez/",
    skills: [1, 2, 3, 11],
  },
  {
    id: 6,
    name: "Luis Alfredo Lorenzo",
    description: "TODO",
    url: "https://www.linkedin.com/in/babasbot/",
    skills: [2, 3, 6, 7],
  },
  {
    id: 7,
    name: "Pedro Esperança",
    description: "TODO",
    url: "https://www.linkedin.com/in/esperancajs/",
    skills: [1, 2, 3, 11],
  },
  {
    id: 8,
    name: "Gautier Roquancourt",
    description: "TODO",
    url: "https://www.gautierroquancourt.com/",
    skills: [4, 5, 8],
  },
  {
    id: 9,
    name: "Louis Roufinaud",
    description: "TODO",
    url: "https://twitter.com/LouisRouffineau",
    skills: [1, 2, 3, 6, 7, 11],
  },
  {
    id: 10,
    name: "Chloé Barria",
    description: "TODO",
    url: "https://www.linkedin.com/in/chlo%C3%A9-barria-lapeyre-17725151/",
    skills: [4, 5, 8],
  },
  {
    id: 11,
    name: "Simon Halimonov",
    description: "TODO",
    url: "https://simonhalimonov.com/",
    skills: [1, 2, 3, 4, 5],
  },
  {
    id: 12,
    name: "Gwenaëlle Thouseau",
    description: "TODO",
    url: "https://www.linkedin.com/in/gwentho/",
    skills: [1, 2, 3, 11],
  },
  {
    id: 13,
    name: "Adrien Rahier",
    description: "TODO",
    url: "https://www.linkedin.com/in/adrienrahier/",
    skills: [1, 3, 11],
  },
  {
    id: 14,
    name: "Isabella Brookes",
    description: "TODO",
    url: "https://www.linkedin.com/in/isabellabrookes/",
    skills: [1, 2, 3],
  },
  {
    id: 15,
    name: "Kalle Moen",
    description: "TODO",
    url: "https://www.kallemoen.com/",
    skills: [4, 5, 11, 12, 13],
  },
  {
    id: 16,
    name: "David Mihal",
    description: "TODO",
    url: "https://twitter.com/dmihal",
    skills: [1, 2, 4, 14],
  },
  {
    id: 17,
    name: "Rahul Kothari",
    description: "TODO",
    url: "https://rahul-kothari.github.io/",
    skills: [2, 14],
  },
  {
    id: 18,
    name: " Kostandin Angjellari",
    description: "TODO",
    url: "https://www.linkedin.com/in/kostandinang/",
    skills: [1, 2, 3, 6, 15],
  },
  {
    id: 19,
    name: "Rishabh",
    description: "TODO",
    url: "",
    skills: [4, 5],
  },
  {
    id: 20,
    name: " Kaustubh Shukla",
    description: "TODO",
    url: "https://www.linkedin.com/in/kausmos/",
    skills: [2, 5],
  },
];

export function getPerson(id: number) {
  const person = data.find((person) => person.id == id);

  if (!person) {
    throw new Error(`No person found with id: ${id}`);
  }

  return person;
}
