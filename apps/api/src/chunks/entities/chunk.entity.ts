import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('chunks')
export class ChunkEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    fileId!: string;

    @Column()
    chunkIndex!: number;

    @Column()
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
}