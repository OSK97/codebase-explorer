import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ScannerService {
    async scanDirectory(rootPath: string) {
        const files: string[] = [];

        const ignoredDirectories = [
            'node_modules',
            '.git',
            'dist',
            '.next',
            'coverage',
        ];

        const walk = (currentPath: string) => {
            const entries = fs.readdirSync(currentPath, {
                withFileTypes: true,
            });

            for (const entry of entries) {
                const fullPath = path.join(
                    currentPath,
                    entry.name,
                );

                if (entry.isDirectory() && ignoredDirectories.includes(entry.name)) {
                    continue;
                }

                if (entry.isDirectory()) {
                    walk(fullPath);
                }
                else {
                    files.push(path.relative(rootPath, fullPath),);
                }
            }
        };

        walk(rootPath);
        return files;
    }
}