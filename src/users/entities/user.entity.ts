import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'decimal', precision: 10 })
  phone: number;

  @Column({ nullable: true })
  image?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  tonification_token: string;

  // * Add a Creation date - Agrega una fecha de creación
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_ad: Date;

  // * Add a updated date - Agrega una fecha de actualización
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_ad: Date;

  // * Add a deletion date - Agrega una fecha de eliminación
  @DeleteDateColumn()
  deletedAt: Date;

  // * Encrypting the password - Encriptando la contraseña
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.HASH_SALT));
  }
}
