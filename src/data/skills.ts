import type { Skill } from "@/types";

const data: Skill[] = [
  { id: 1, name: "Frontend", position: "Frontend Developer" },
  { id: 2, name: "Backend", position: "Backend Developer" },
  { id: 3, name: "DevOps", position: "DevOps" },
  { id: 4, name: "UI Design", position: "UI Designer" },
  { id: 5, name: "UX Design", position: "UX Designer" },
  { id: 6, name: "Database Design", position: "Database Designer" },
  { id: 7, name: "API Design", position: "API Designer" },
  { id: 8, name: "Branding", position: "Brand Designer" },
  { id: 9, name: "Testing", position: "Tester" },
  { id: 10, name: "Motion Design", position: "Motion Designer" },
  { id: 11, name: "Project Management", position: "Project Manager" },
  { id: 12, name: "Product Management", position: "Product Manager" },
  { id: 13, name: "Copywriting", position: "Copywriter" },
  { id: 14, name: "Smart Contracts", position: "Smart Contract Developer" },
];

export function getSkill(id: number): Skill {
  const skill = data.find((skill) => skill.id == id);

  if (!skill) {
    throw new Error(`No skill found with id: ${id}`);
  }

  return skill;
}
