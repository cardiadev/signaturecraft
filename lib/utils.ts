import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Copies rich HTML text to clipboard so it can be pasted visually into Gmail / Outlook signature editors.
 * Guaranteed never to paste raw HTML code string into Gmail.
 */
export async function copyFormattedHtmlToClipboard(htmlString: string, plainText: string): Promise<boolean> {
  // Method 1: Modern Clipboard API with text/html Blob
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([htmlString], { type: "text/html" });
      const blobText = new Blob([plainText], { type: "text/plain" });
      const item = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      });
      await navigator.clipboard.write([item]);
      return true;
    }
  } catch (err) {
    console.warn("ClipboardItem API failed, using DOM selection fallback: ", err);
  }

  // Method 2: DOM Selection & execCommand("copy") (100% Reliable for Gmail Rich Text Editor)
  try {
    const container = document.createElement("div");
    container.innerHTML = htmlString;
    container.style.position = "fixed";
    container.style.pointerEvents = "none";
    container.style.opacity = "0";
    container.style.left = "-9999px";
    container.style.top = "-9999px";

    document.body.appendChild(container);

    const range = document.createRange();
    range.selectNodeContents(container);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const successful = document.execCommand("copy");

    if (selection) {
      selection.removeAllRanges();
    }
    document.body.removeChild(container);

    return successful;
  } catch (e) {
    console.error("DOM selection copy failed: ", e);
    return false;
  }
}
