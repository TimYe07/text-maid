import { Injectable } from '@nestjs/common';
import AsciiDoctor from 'asciidoctor.js';
import highlightJsExt from 'asciidoctor-highlight.js';
import { TextTransformer } from "../text-transformer";

const asciiDoctor = new AsciiDoctor();
const registry = asciiDoctor.Extensions.create();
highlightJsExt.register(registry);

const convertOptions = {
    safe: 'safe',
    attributes: {
        icons: 'font',
        stem: 'latexmath',
        toc: 'auto',
        'toc-title': '内容导航',
        toclevels: 5,
        linkattrs: '',
        'caution-caption': '⚠️',
        'important-caption': '‼️',
        'note-caption': '💬',
        'tip-caption': '💡',
        'warning-caption': '🚨',
        'source-highlighter': 'highlightjs-ext'
    },
    'extension_registry': registry,
};

@Injectable()
export class AsciiDocService implements TextTransformer {
    render(src: string) {
        const html = asciiDoctor.convert(src, convertOptions);
        return { source: src, html };
    }
}
