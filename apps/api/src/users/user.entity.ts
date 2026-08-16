import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')        //to store user info
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;     //value will be initialized later

    @Column({ unique: true })
    email!: string;

    @CreateDateColumn()
    createdAt!: Date;
}