import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, IntegerType } from "typeorm"

@Entity()
export class Weights {
    @PrimaryColumn({ unique: true })
    batchNo: number;

    @Column("float", { array: true })
    1: number[];

    @Column("float", { array: true })
    2: number[];

    @Column("float", { array: true })
    3: number[];

    @Column("float", { array: true })
    4: number[];
}