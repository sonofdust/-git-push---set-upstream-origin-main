import { pipeline } from '@huggingface/transformers';


const translator: any = await pipeline('translation', 'Xenova/m2m100_418M', { dtype: 'q8' });


export const translateText = async (sourceText: string, srcLang: string, tgtLang: string): Promise<string> => {
    try {
        const output = await translator(sourceText, {
            src_lang: srcLang,
            tgt_lang: tgtLang,
        });
        return output[0].translation_text;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
};