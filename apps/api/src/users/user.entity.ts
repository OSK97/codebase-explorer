import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;     //value will be initialized later

    @Column({ unique: true })
    email!: string;

    @CreateDateColumn()
    createdAt!: Date;
}