import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ScannerService {
    private readonly allowedExtensions = [
        '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.html', '.css', '.py',
    ];

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
                    const extension = path.extname(entry.name);         //add only allowed extension

                    if (this.allowedExtensions.includes(extension)) {
                        files.push(path.relative(rootPath, fullPath),);
                    }
                }
            }
        };

        walk(rootPath);
        return files;
    }

    readFileContent(filePath: string) {
        return fs.readFileSync(filePath, 'utf-8');
    }
}