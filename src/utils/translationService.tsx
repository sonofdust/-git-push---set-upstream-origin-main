import { pipeline, Pipeline } from '@huggingface/transformers';

// Define a type for the translator
type Translator = Pipeline & {
    (text: string, options: { src_lang: string; tgt_lang: string }): Promise<{ translation_text: string }[]>;
};

// Use memoization for the translator
let translatorPromise: Promise<Translator> | null = null;

const getTranslator = async (): Promise<Translator> => {
    if (!translatorPromise) {
        translatorPromise = pipeline("translation", "Xenova/m2m100_418M", { dtype: "q8" }) as unknown as Promise<Translator>;
    }
    return translatorPromise;
};

// Simple in-memory cache
const cache: Record<string, string> = {};

export const translateText = async (
    sourceText: string,
    srcLang: string,
    tgtLang: string,
    timeout = 10000
): Promise<string> => {
    const cacheKey = `${sourceText}_${srcLang}_${tgtLang}`;

    // Check cache first
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    try {
        const translator = await Promise.race([
            getTranslator(),
            new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Translation timed out')), timeout)
            )
        ]);

        const result = await translator(sourceText, { src_lang: srcLang, tgt_lang: tgtLang });
        const translatedText = result[0].translation_text;

        // Cache the result
        cache[cacheKey] = translatedText;

        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error(`Translation failed: ${(error as Error).message}`);
    }
};
