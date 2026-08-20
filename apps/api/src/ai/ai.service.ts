import { Injectable } from '@nestjs/common';
import Ollama from 'ollama';

@Injectable()
export class AiService {
    async ask(prompt: string) {
        const response = await Ollama.chat({
            model: 'qwen2.5:1.5b',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                }
            ]
        })
        return response.message.content;
    }
}
