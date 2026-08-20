import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('embeddings')
export class EmbeddingEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    chunkId!: string;

    @Column({
        type: 'vector',
        length: 768,
    })
    vector!: number[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}