import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      let createRole = await this.prismaService.role.create({
        data: {
          type: createRoleDto.type,
        },
      });
      if (createRole) return { Message: 'Role Created' };
    } catch (err) {
      return err;
    }
  }

  async findAll() {
    try {
      let roles = await this.prismaService.role.findMany();
      if (roles) return { Roles: roles };
    } catch (err) {
      return err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
