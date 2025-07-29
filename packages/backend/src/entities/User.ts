import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";
import { UserRoleEnum } from "@rick-morty-app/libs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({
    type: "varchar",
    default: UserRoleEnum.FAN,
  })
  role: string;

  @Column({ type: "int", array: true, default: [] })
  favoriteCharacters: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  setPassword(password: string): void {
    this.password = password;
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  addFavoriteCharacter(characterId: number): void {
    if (!this.favoriteCharacters.includes(characterId)) {
      this.favoriteCharacters.push(characterId);
    }
  }

  removeFavoriteCharacter(characterId: number): void {
    this.favoriteCharacters = this.favoriteCharacters.filter((id) => id !== characterId);
  }

  isFavoriteCharacter(characterId: number): boolean {
    return this.favoriteCharacters.includes(characterId);
  }
}
