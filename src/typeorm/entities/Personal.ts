import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name : 'Personal'})
export class Personal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : 'Address' , type: 'varchar', length: '255' , nullable: true})
    Address: string;

    @Column({name : 'Age' , type: 'varchar', length: '255' })
    Age: string;

    @Column({name : 'Gender' , type: 'varchar', length: '255' })
    Gender: string;
  
}