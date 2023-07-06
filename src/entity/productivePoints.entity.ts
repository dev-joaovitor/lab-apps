import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class productivePoints {
    @PrimaryColumn({ unique: true })
    equipment: string;

    @Column()
    productivePoint: number;
}