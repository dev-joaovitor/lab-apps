import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class individualTolerances {
    @PrimaryColumn({ unique: true })
    nominalVolume: number;

    @Column({ type: "float" })
    individualTolerance: number;
}