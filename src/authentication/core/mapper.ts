import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Mapper<DAO, DTO> {
    abstract toDTO(dao: DAO): DTO;
    abstract toDAO(dto: DTO): DAO;
}
