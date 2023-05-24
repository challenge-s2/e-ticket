import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Shop {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({
        nullable: false,
        type: "char",
        length: 75
    })
    public name: string;

    @Column({
        nullable: false,
        type: "text"
    })
    public address: string;
}