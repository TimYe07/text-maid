import { Injectable } from '@nestjs/common';
import { RenderedDocument, TextDoc, TocItem } from '../../model/text-doc';
import cheerio from 'cheerio';
import { uniq } from 'lodash';

@Injectable()
export class HtmlProcessorService {
    private detectLanguages($: CheerioStatic) {
        const codeBlocks = $('pre code[data-lang]');
        return uniq(codeBlocks.toArray().map(el => $(el).data('lang') as string));
    }

    private getToc($: CheerioStatic) {
        return $('h2,h3,h4,h5,h6').toArray().map(el => {
            const name = $(el).text();
            const level = parseInt(el.tagName[1], 10);
            const id = '#' + $(el).attr('id');
            return { name, level, id } as TocItem;
        });
    }

    process(doc: TextDoc) {
        const $ = cheerio.load(doc.html, { xmlMode: true, decodeEntities: false });
        return { doc, languages: this.detectLanguages($), toc: this.getToc($) } as RenderedDocument;
    }
}
