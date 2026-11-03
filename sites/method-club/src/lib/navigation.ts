export const appendCurrentSearchParams = (url: string) => {
  if (typeof window === "undefined") return url.trim();

  const targetUrl = new URL(url, window.location.origin);
  const currentParams = new URLSearchParams(window.location.search);

  currentParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  return targetUrl.toString();
};

export const getTelegramHref = (url: string) => {
  const normalized = url.trim();
  if (!normalized) return "";

  if (normalized.startsWith("@")) {
    return `https://t.me/${normalized.slice(1)}`;
  }

  if (/^(t\.me|telegram\.me)\//.test(normalized)) {
    return `https://${normalized}`;
  }

  return normalized;
};

const openExternal = (url: string) => {
  if (!url) return;
  window.location.href = url;
};

export const openPayment = (url: string) => {
  const normalized = url.trim();
  if (!normalized) return;

  try {
    const targetUrl = appendCurrentSearchParams(normalized);
    const newWindow = window.open(targetUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      window.location.href = targetUrl;
    }
  } catch {
    const newWindow = window.open(normalized, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      window.location.href = normalized;
    }
  }
};

export const openTelegram = (url: string) => {
  const normalized = url.trim();
  if (!normalized) return;

  const targetUrl = getTelegramHref(normalized);
  if (!targetUrl) return;

  openExternal(targetUrl);
};
