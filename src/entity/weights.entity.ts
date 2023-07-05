import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, IntegerType } from "typeorm"

@Entity()
export class Weights {
    @PrimaryColumn({ unique: true })
    batchNo: number;

    @Column("int", { array: true })
    1: number[];

    @Column("int", { array: true })
    2: number[];

    @Column("int", { array: true })
    3: number[];

    @Column("int", { array: true })
    4: number[];
}