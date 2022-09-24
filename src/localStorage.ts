export function saveLocal(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocal(key: string) {
  const result = localStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return null;
}

export function clearLocal(key: string) {
  localStorage.removeItem(key);
}
