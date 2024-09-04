interface StorageItem {
  value: string;
  expiry: number;
}

const setItemWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date();
  const item: StorageItem = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key: string): string | null => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item: StorageItem = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const removeItem = (key: string): boolean => {
  localStorage.removeItem(key);

  return true;
};

export { setItemWithExpiry, getItemWithExpiry, removeItem };
