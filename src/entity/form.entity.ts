import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm"

@Entity()
export class Form {
    @PrimaryColumn()
    batchNo: number

    @Column()
    userId: number

    @Column()
    waterDensity: number

    @Column()
    productivePoint: number

    @Column()
    nominalVolume: number

    @Column()
    individualTolerance: number
}