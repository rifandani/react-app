interface ExperimentalNavigator {
  userAgentData?: {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
    getHighEntropyValues: (hints: string[]) => Promise<{
      platform: string;
      platformVersion: string;
      uaFullVersion: string;
    }>;
  };
}

export function getPlatform(): string {
  const nav = navigator as ExperimentalNavigator;

  if (nav?.userAgentData?.platform) {
    return nav.userAgentData.platform;
  }

  let platform = '';

  nav.userAgentData
    ?.getHighEntropyValues(['platform'])
    .then((highEntropyValues: { platform: string }) => {
      if (highEntropyValues.platform) {
        platform = highEntropyValues.platform;
      }
    });

  if (typeof navigator.platform === 'string') {
    return navigator.platform;
  }

  return platform;
}

export function isMacOS() {
  return getPlatform().toLowerCase().includes('mac');
}

export function getShortcutKey(key: string) {
  if (key.toLowerCase() === 'mod') {
    return isMacOS() ? '⌘' : 'Ctrl';
  }
  if (key.toLowerCase() === 'alt') {
    return isMacOS() ? '⌥' : 'Alt';
  }
  if (key.toLowerCase() === 'shift') {
    return isMacOS() ? '⇧' : 'Shift';
  }
  return key;
}

export function getShortcutKeys(keys: string[]) {
  return keys.map((key) => getShortcutKey(key)).join('');
}
