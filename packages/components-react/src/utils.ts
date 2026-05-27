type ClassValue = string | boolean | undefined | ClassValue[];

export function mergeClasses(...classes: ClassValue[]) {
  const set = classes
    .flat()
    .map((c) => (typeof c === "string" ? c : ""))
    .filter(Boolean)
    .reduce((acc, c) => acc.add(c), new Set<ClassValue>());

  return Array.from(set).join(" ");
}
