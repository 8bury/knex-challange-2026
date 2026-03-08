import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Store from "./store.entity";
import File from "./file.entity";

@Entity({ name: "products" })
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  index: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToOne(() => File)
  @JoinColumn({ name: "file_id" })
  file: File;
}

export default Product;
