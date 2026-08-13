import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('repositories')
export class RepositoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    githubUrl!: string;

    @Column({
        default: 'pending',
    })
    status!: string;

    @Column({
        default: 'main',
    })
    defaultBranch!: string;

    @Column({
        nullable: true,
    })
    primaryLanguage?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}