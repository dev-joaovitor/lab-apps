import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm"

@Entity()
export class Form {
    @PrimaryColumn()
    batchNo: number

    @Column()
    userId: number

    @Column("float")
    waterDensity: number

    @Column()
    productivePoint: number

    @Column()
    nominalVolume: number

    @Column("float")
    individualTolerance: number
}