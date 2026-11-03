const SHORT_WORDS =
  /\b(а|и|в|во|на|но|с|со|к|ко|у|о|об|обо|по|из|за|от|до|не|ни|или|для|под|над|при|без|про)\s+/gi;

export const trimParagraphEnding = (text: string) => text.replace(/\.\s*$/, "");

export const widont = (text: string) =>
  trimParagraphEnding(text).replace(SHORT_WORDS, (match) => match.trimEnd() + "\u00A0");
