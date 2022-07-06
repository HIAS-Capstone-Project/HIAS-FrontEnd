export interface ISession {
  token?: string;
  roles?: string;
}

function convertStringToObject(
  value: string | null,
): object | Array<unknown> | null {
  if (!value) {
    return null;
  }
  const valueAsObject = JSON.parse(value);
  if (typeof valueAsObject === 'object') {
    const keys = Object.keys(valueAsObject);
    const regex = /^[\\[\\{]/;
    for (const key of keys) {
      const temp = valueAsObject[key];
      if (temp && regex.test(temp) && typeof temp === 'string') {
        valueAsObject[key] = JSON.parse(temp);
      }
    }
  }
  return valueAsObject;
}

export const KEYS = {
  SESSION: 'SESSION',
};

export function setItem(key: string, value: any) {
  let storeValue = value;
  if (typeof value === 'object') {
    storeValue = JSON.stringify(value);
  }
  localStorage.setItem(key, storeValue);
}

export function getItem(keyName: string) {
  const value = localStorage.getItem(keyName);
  return convertStringToObject(value);
}

export function removeItem(keyName: string) {
  localStorage.removeItem(keyName);
}

export function setSessionInfo(session: ISession): void {
  setItem(KEYS.SESSION, session);
  const event = new Event('sessionChange');
  document.dispatchEvent(event);
}

export function getSessionInfo(): ISession {
  return getItem(KEYS.SESSION) || {};
}

export function removeSessionInfo(): void {
  removeItem(KEYS.SESSION);
}
