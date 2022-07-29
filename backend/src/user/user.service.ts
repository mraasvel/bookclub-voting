import {
	Injectable,
	NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository, FindOneOptions } from 'typeorm';
  import { User } from './user.entity';
  import { IntraUser } from './user.types';
  
  @Injectable()
  export class UserService {
	constructor(
	  @InjectRepository(User) private userRepository: Repository<User>,
	) {}
  
	createUser(user: User): Promise<User> {
	  const newUser = this.userRepository.create(user);
	  return this.userRepository.save(newUser);
	}
  
	private createFromDto(userDTO: IntraUser): User {
	  return this.userRepository.create(userDTO);
	}
  
	async addUser(userDTO: IntraUser) {
	  const user = this.createFromDto(userDTO);
	  return await this.userRepository.save(user);
	}

	async findById(id: number): Promise<User> {
		const user = await this.userRepository.findOneBy({ id });
		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}

	async findByIntraId(user: IntraUser) {
		return await this.userRepository.findOneBy({ intraId: user.intraId });
	}
  }
  