import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm"
@Entity()
export class Weights {
    @PrimaryColumn({ unique: true })
    batchNo: number;

    @Column("float", { array: true })
    p1: number[];

    @Column("float", { array: true })
    p2: number[];

    @Column("float", { array: true })
    p3: number[];

    @Column("float", { array: true })
    p4: number[];
}