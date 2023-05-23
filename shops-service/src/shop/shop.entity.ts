import {Column, Entity} from "typeorm";

@Entity()
export class Shop {

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