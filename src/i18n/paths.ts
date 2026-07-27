import { languages, type Lang } from './ui';

/** Um caminho por idioma — base do getStaticPaths de toda rota `[lang]`. */
export function langPaths() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }));
}
