import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity('files')                //stores file info of repo
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    repositoryId!: string;

    @Column()
    path!: string;

    @Column()
    language!: string;

    @Column()
    size!: number;

    @Column('text')
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}