import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column('decimal')
  prix: number;

  @Column('int')
  stock: number;
}
