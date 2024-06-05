import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { Personal } from './Personal';

@Entity()
export class User {
  @PrimaryGeneratedColumn({name : 'id'})

  id: number;

  @Column({nullable : true})
  firstName: string;

  @Column({nullable : true})
  lastName: string;

  @Column({name : 'password', nullable: true})
  password : string;
  @Column({ default: true })
  isActive: boolean;
  
   @Column({nullable : true})
   email : string;
   
   @OneToOne(() => Personal)
   @JoinColumn()
    personal: Personal;

}