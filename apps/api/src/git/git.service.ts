import { Injectable } from '@nestjs/common';
import { simpleGit } from 'simple-git';
import * as fs from 'fs-extra';
@Injectable()
export class GitService {
    private git = simpleGit();

    async cloneRepository(
        githubUrl: string,
        targetPath: string,
    ) {
        await fs.ensureDir(targetPath);
        await this.git.clone(githubUrl, targetPath);
    }
}