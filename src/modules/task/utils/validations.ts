export function isValidDueDate(dueDate: string): boolean {
  const currentDate = new Date();
  const parsedDueDate = new Date(dueDate);

  return parsedDueDate > currentDate;
}
