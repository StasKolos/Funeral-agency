export const inlineText = (strings: TemplateStringsArray, ...values: string[]) =>
    String.raw({ raw: strings.raw }, ...values)
        .replace(/\s+/g, ' ')
        .trim();
