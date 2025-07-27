import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail, IsString, MinLength, IsEnum, IsArray } from "class-validator";
import * as bcrypt from "bcryptjs";
import { UserRole } from "@rick-morty-app/libs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  @IsEmail()
  email!: string;

  @Column({ type: "varchar" })
  @IsString()
  @MinLength(2)
  name!: string;

  @Column({ type: "varchar" })
  @IsString()
  @MinLength(6)
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.FAN,
  })
  @IsEnum(UserRole)
  role!: UserRole;

  @Column("int", { array: true, default: [] })
  @IsArray()
  favoriteCharacters: number[] = [];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  setPassword(plainPassword: string): void {
    const saltRounds = 12;
    this.password = bcrypt.hashSync(plainPassword, saltRounds);
  }

  validatePassword(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.password);
  }

  addFavoriteCharacter(characterId: number): void {
    if (!this.favoriteCharacters.includes(characterId)) {
      this.favoriteCharacters.push(characterId);
    }
  }

  removeFavoriteCharacter(characterId: number): void {
    this.favoriteCharacters = this.favoriteCharacters.filter(
      (id) => id !== characterId
    );
  }

  isFavoriteCharacter(characterId: number): boolean {
    return this.favoriteCharacters.includes(characterId);
  }
}
