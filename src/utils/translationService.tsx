import { pipeline } from '@huggingface/transformers';

let translator: any = null;

const initializeTranslator = async () => {
    if (!translator) {
        translator = await pipeline("translation", "Xenova/m2m100_418M", { dtype: "q8" });
    }
};

export const translateText = async (sourceText: string, srcLang: string, tgtLang: string): Promise<string> => {
    try {
        await initializeTranslator();
        const result = await translator(sourceText, { src_lang: srcLang, tgt_lang: tgtLang });
        return result[0].translation_text;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
};
